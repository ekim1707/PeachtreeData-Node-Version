create table users (
   id serial primary key not null,
   first_name text not null,
   last_name text not null,
   email text UNIQUE not null,
   password text
);

create table profile (
   id serial primary key not null,
   profile_picture text,
   profile_id integer references users(id)
);

create table media (
   id serial primary key not null,
   images text,
   image_lists text,
   videos text,
   video_lists text,
   time_stamp date,
   media_id integer references users(id)
);

create table places (
   id serial primary key not null,
   favorites text,
   time_stamp date,
   place_id integer references users(id)
);

create table quotes_lyrics (
   id serial primary key not null,
   quote text,
   lyrics text,
   time_stamp date,
   quote_id integer references users(id)
);

create table freewrite (
   id serial primary key not null,
   freewrite text,
   journal text,
   time_stamp date,
   freewrite_id integer references users(id)
);