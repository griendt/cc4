module.exports = {
    "up": `
        create table games (
            id bigint unsigned auto_increment primary key,
            created_at timestamp null,
            updated_at timestamp null,
            deleted_at timestamp null,
            display_name varchar(255) not null,
            description varchar(255) null,
            started_at timestamp null,
            ended_at timestamp null,
            state json null
        )
    `,
    "down": `drop table if exists games`,
}