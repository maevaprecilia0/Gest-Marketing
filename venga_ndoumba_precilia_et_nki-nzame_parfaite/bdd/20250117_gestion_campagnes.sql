PGDMP      5                 }            gestion_campagnes    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24599    gestion_campagnes    DATABASE     �   CREATE DATABASE gestion_campagnes WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_Gabon.1252';
 !   DROP DATABASE gestion_campagnes;
                postgres    false            �            1259    24612 	   campagnes    TABLE     �   CREATE TABLE public.campagnes (
    id integer NOT NULL,
    nom character varying(255) NOT NULL,
    statut character varying(100) NOT NULL,
    canal character varying(100),
    budget_alloue numeric(10,2),
    budget_depense numeric(10,2)
);
    DROP TABLE public.campagnes;
       public         heap    postgres    false            �            1259    24611    campagnes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.campagnes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.campagnes_id_seq;
       public          postgres    false    217            �           0    0    campagnes_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.campagnes_id_seq OWNED BY public.campagnes.id;
          public          postgres    false    216            �            1259    24608    u    TABLE        CREATE TABLE public.u (
);
    DROP TABLE public.u;
       public         heap    postgres    false                       2604    24615    campagnes id    DEFAULT     l   ALTER TABLE ONLY public.campagnes ALTER COLUMN id SET DEFAULT nextval('public.campagnes_id_seq'::regclass);
 ;   ALTER TABLE public.campagnes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �          0    24612 	   campagnes 
   TABLE DATA           Z   COPY public.campagnes (id, nom, statut, canal, budget_alloue, budget_depense) FROM stdin;
    public          postgres    false    217   �       �          0    24608    u 
   TABLE DATA              COPY public.u  FROM stdin;
    public          postgres    false    215   �       �           0    0    campagnes_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.campagnes_id_seq', 8, true);
          public          postgres    false    216                        2606    24617    campagnes campagnes_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.campagnes
    ADD CONSTRAINT campagnes_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.campagnes DROP CONSTRAINT campagnes_pkey;
       public            postgres    false    217            �   K   x�3�tu�L/J�)�422�4=����2�,CS��!HԂ�
8��S��R8SR@z�J�� �(F���  )o      �      x������ � �     