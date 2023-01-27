import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

// @Entity({ schema: 'authority', name: 'groups' })
@Entity({name: 'tasks' })
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    is_done: boolean

    @Column({ name: 'created_by', type: 'uuid', nullable: true })
    created_by?: string;

    @Column({ name: 'modified_by', type: 'uuid', nullable: true })
    modified_by?: string;

    @CreateDateColumn({ nullable: true })
    created_at?: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at?: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
