$(document).ready(function () {
    // Charger les campagnes
    function chargerCampagnes() {
        $.ajax({
            url: '/api/campagnes',
            method: 'GET',
            success: function (response) {
                if (response.success) {
                    let contenu = '';
                    response.campagnes.forEach(campagne => {
                        contenu += `
                            <tr>
                                <td>${campagne.nom}</td>
                                <td>${campagne.statut}</td>
                                <td>${campagne.canal}</td>
                                <td>${campagne.budget_alloue} €</td>
                                <td>${campagne.budget_depense} €</td>
                                <td>
                                    <button class="btn btn-sm delete-btn" data-id="${campagne.id}">Supprimer</button>
                                </td>
                            </tr>
                        `;
                    });
                    $('#campagnesTable').html(contenu);
                }
            },
            error: function () {
                afficherNotification('Erreur lors du chargement des campagnes.', 'danger');
            }
        });
    }

    // Afficher/masquer le formulaire d'ajout
    $('#toggleFormButton').on('click', function () {
        $('#formulaire').toggle();
    });

    // Ajouter une campagne
    $('#campagneForm').on('submit', function (e) {
        e.preventDefault();
        const data = {
            nom: $('#nomCampagne').val(),
            statut: $('#statutCampagne').val(),
            canal: $('#canalCampagne').val(),
            budget_alloue: $('#budgetAlloue').val(),
            budget_depense: $('#budgetDepense').val()
        };

        $.ajax({
            url: '/api/campagnes',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                if (response.success) {
                    afficherNotification(response.message, 'success');
                    chargerCampagnes();
                    $('#campagneForm')[0].reset();
                    $('#formulaire').hide(); // Cache le formulaire après l'ajout
                }
            },
            error: function (xhr) {
                const error = xhr.responseJSON ? xhr.responseJSON.message : 'Erreur inconnue.';
                afficherNotification(error, 'danger');
            }
        });
    });

    // Supprimer une campagne
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette campagne ?");
        if (confirmation) {
            $.ajax({
                url: `/api/campagnes/${id}`,
                method: 'DELETE',
                success: function (response) {
                    if (response.success) {
                        afficherNotification(response.message, 'success');
                        chargerCampagnes();
                    }
                },
                error: function () {
                    afficherNotification('Erreur lors de la suppression de la campagne.', 'danger');
                }
            });
        }
    });

    // Afficher les notifications
    function afficherNotification(message, type) {
        const notification = $('#notification');
        notification
            .removeClass('d-none alert-success alert-danger')
            .addClass(`alert-${type}`)
            .text(message);
        setTimeout(() => notification.addClass('d-none'), 3000);
    }

    // Charger les campagnes au démarrage
    chargerCampagnes();
});
