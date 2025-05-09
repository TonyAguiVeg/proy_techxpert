create database db_task;
use db_task;

create table tb_task(
id_task int primary key auto_increment,
title varchar(100) not null,
estado varchar(20) default 'Pendiente',
created_at timestamp default current_timestamp
);

select * from tb_task;

delimiter //
create procedure usp_listar_tasks()
begin
    SELECT * FROM tb_task 
    order by created_at desc;
end //
delimiter;



-- Insertar una tarea
delimiter //
create procedure usp_insertar_task(IN p_title VARCHAR(255))
BEGIN
    INSERT INTO tb_task (title) VALUES (p_title);
END //
delimiter;

-- Actualizar una tarea
DELIMITER //
CREATE PROCEDURE usp_uactualizar_task(IN p_id INT, IN p_title VARCHAR(255), IN p_estado VARCHAR(50))
BEGIN
    UPDATE tb_task SET title = p_title, estado = p_estado WHERE id_task = p_id;
END //
DELIMITER ;

-- Eliminar una tarea
DELIMITER //
CREATE PROCEDURE usp_eliminar_task(IN p_id INT)
BEGIN
    DELETE FROM tb_task WHERE id_task = p_id;
END //
DELIMITER ;
