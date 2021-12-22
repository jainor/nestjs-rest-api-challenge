-- Insert into shopping_carts when inserting on table users

CREATE OR REPLACE FUNCTION function_copy() RETURNS TRIGGER AS
$BODY$
BEGIN
    INSERT INTO
        "shopping_carts"(id,user_id)
        VALUES(new.id,new.id);

           RETURN new;
END;
$BODY$
language plpgsql;


CREATE TRIGGER trig_copy
     AFTER INSERT ON "users"
     FOR EACH ROW
     EXECUTE PROCEDURE function_copy();
