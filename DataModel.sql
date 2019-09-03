CREATE SEQUENCE foo_a_seq START WITH 1; -- replace 12345 with max above

CREATE TABLE public.cuisines
(
  cuisine_id integer NOT NULL,
  cuisine_name character varying NOT NULL,
  CONSTRAINT cuisines_cuisine_id PRIMARY KEY (cuisine_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.cuisines
  OWNER TO postgres;

CREATE TABLE public.locations
(
  pincode numeric NOT NULL,
  location_name text NOT NULL,
  CONSTRAINT locations_pincode PRIMARY KEY (pincode)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.locations
  OWNER TO postgres;

CREATE TABLE public.menus
(
  menu_id integer NOT NULL DEFAULT nextval('foo_a_seq'::regclass),
  restaurant_id integer NOT NULL,
  cuisine_id integer NOT NULL,
  item_name character varying NOT NULL,
  availability numeric NOT NULL,
  price money,
  item_description character varying,
  image_url character varying,
  CONSTRAINT menus_menu_id PRIMARY KEY (menu_id),
  CONSTRAINT menus_cuisine_id_fkey FOREIGN KEY (cuisine_id)
      REFERENCES public.cuisines (cuisine_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT menus_restaurant_id_fkey FOREIGN KEY (restaurant_id)
      REFERENCES public.restaurants (restaurant_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.menus
  OWNER TO postgres;

CREATE TABLE public.users
(
  user_id integer NOT NULL DEFAULT nextval('foo_a_seq'::regclass),
  name character varying NOT NULL,
  pincode numeric NOT NULL,
  contact_number numeric NOT NULL,
  email text NOT NULL,
  time_joined timestamp without time zone NOT NULL,
  password character varying NOT NULL,
  user_type character varying,
  CONSTRAINT users_user_id PRIMARY KEY (user_id),
  CONSTRAINT users_pincode_fkey FOREIGN KEY (pincode)
      REFERENCES public.locations (pincode) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT users_email_key UNIQUE (email)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.users
  OWNER TO postgres;

CREATE TABLE public.restaurants
(
  restaurant_id integer NOT NULL DEFAULT nextval('foo_a_seq'::regclass),
  address character varying NOT NULL,
  pincode numeric NOT NULL,
  total_tables numeric NOT NULL,
  restaurant_name character varying NOT NULL,
  amenities character varying,
  user_id integer,
  image_url character varying,
  CONSTRAINT restaurants_restaurant_id PRIMARY KEY (restaurant_id),
  CONSTRAINT rest_user_fk FOREIGN KEY (user_id)
      REFERENCES public.users (user_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT restaurants_pincode_fkey FOREIGN KEY (pincode)
      REFERENCES public.locations (pincode) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.restaurants
  OWNER TO postgres;

  

CREATE TABLE public.bookings
(
  booking_id integer NOT NULL DEFAULT nextval('foo_a_seq'::regclass),
  restaurant_id integer NOT NULL,
  used_id integer NOT NULL,
  seats integer NOT NULL,
  date date NOT NULL,
  "time" time without time zone NOT NULL,
  CONSTRAINT bookings_booking_id PRIMARY KEY (booking_id),
  CONSTRAINT bookings_restaurant_id_fkey FOREIGN KEY (restaurant_id)
      REFERENCES public.restaurants (restaurant_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT bookings_used_id_fkey FOREIGN KEY (used_id)
      REFERENCES public.users (user_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.bookings
  OWNER TO postgres;
  
CREATE TABLE public.availability
(
  availability_id integer NOT NULL,
  restaurant_id integer NOT NULL,
  total_tables numeric NOT NULL,
  remaining numeric NOT NULL,
  status boolean NOT NULL,
  CONSTRAINT availability_availability_id PRIMARY KEY (availability_id),
  CONSTRAINT availability_restaurant_id_fkey FOREIGN KEY (restaurant_id)
      REFERENCES public.restaurants (restaurant_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.availability
  OWNER TO postgres;


CREATE OR REPLACE FUNCTION public.signupuser(
    username character varying,
    pincode numeric,
    contactnumber numeric,
    email text,
    password character varying,
    usertype character varying)
  RETURNS void AS
$BODY$
      BEGIN
        INSERT INTO public.users(
            name, pincode, contact_number, email, time_joined, password, user_type)
	VALUES (username, pincode, contactnumber, email, now(), password, usertype);
      END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.signupuser(character varying, numeric, numeric, text, character varying, character varying)
  OWNER TO postgres;


  
 

CREATE OR REPLACE FUNCTION public.postrestaurantdetails(
    userid integer,
    address character varying,
    name character varying,
    pincode numeric,
    totaltables numeric,
    amenities character varying,
    imageurl character varying)
  RETURNS void AS
$BODY$
      BEGIN
        INSERT INTO public.restaurants(address, pincode, total_tables, restaurant_name,amenities, user_id, image_url)
	VALUES (address, pincode, totaltables, name, amenities, userid, imageurl);
      END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.postrestaurantdetails(integer, character varying, character varying, numeric, numeric, character varying, character varying)
  OWNER TO postgres;



CREATE OR REPLACE FUNCTION public.postmenudetails(
    restaurantid integer,
    cuisineid integer,
    itemname character varying,
    availability numeric,
    price money,
    itemdescription character varying,
    imageurl character varying)
  RETURNS void AS
$BODY$
      BEGIN
         INSERT INTO public.menus(restaurant_id, cuisine_id, item_name, availability, price, item_description, image_url)
    VALUES (restaurantid, cuisineid, itemname, availability, price, itemdescription, imageurl);
      END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.postmenudetails(integer, integer, character varying, numeric, money, character varying, character varying)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION public.makebooking(
    noofseats integer,
    restaurantid integer,
    userid integer)
  RETURNS integer AS
$BODY$
BEGIN

IF noOfSeats <= (SELECT total_tables FROM restaurants WHERE restaurant_id = restaurantid)
	THEN 
	UPDATE restaurants SET total_tables = total_tables - noOfSeats WHERE restaurant_id = restaurantid;
	INSERT INTO bookings(restaurant_id, used_id, seats, date, time) VALUES (restaurantid, userid, noofseats,  now(), '06:00');
		RETURN (SELECT MAX(booking_id) as booking_id FROM bookings WHERE restaurant_id = restaurantid AND used_id = userid);
ELSE
		RETURN -1;
END IF;
END 
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.makebooking(integer, integer, integer)
  OWNER TO postgres;
