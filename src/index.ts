import { exit } from "process"
import { MetadataWithSuchNameAlreadyExistsError } from "typeorm";
import { AppDataSource } from "./data-source";
import { Task } from "./entity/Task";
import promptSync from 'prompt-sync'

function menu() {
    console.log("Menu Applikasi Todo");
    console.log("1. Tambah Task");
    console.log("2. Daftar Task");
    console.log("3. Ubah Task");
    console.log("4. Hapus Task");
    console.log("5. Selesai Task");
    console.log("0. untuk Keluar dari applikasi");
    console.log("Masukkan Angka 1 - 5 untuk memilih operasi yang ingin dilakukan");
    console.log("Mohon Masukkan Pilihan Anda"); 
}

AppDataSource.initialize().then(async () => {
    /*
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")
    */

    const prompt = promptSync({sigint: true});
    let input_menu = null;
    do {
        menu();
        input_menu = prompt("Masukkan Pilihan Operasi yang ingin anda lakukan ? ");
        console.log(`Pilihan Anda: ${input_menu}`);
        if (parseInt(input_menu) === Number(1)) {
            console.log("Anda Memilih Operasi Tambah Data Task");
            const input_data = prompt("Masukkan Nama Task : ");
            let task = new Task();
            task.name = input_data;
            task.is_done = false;
            await AppDataSource.manager.save(task);
        } else if (input_menu == Number(2)) {
            console.log("Melakukan Operasi Menampilkan Daftar Tugas");
            // tampilkan semua data yang ada dalam database
            
        } else if (input_menu == Number(3)) {
            console.log("Melakukan Operasi Melakukan Ubah Tugas");
            // tampilkan aksi menerima input nomor task yang ingin diubah
            const input_task_number = prompt("Masukkan Nomor Task : ");
            // cari data yang diinginkan oleh pengguna
            const input_task_number_int = Number(input_task_number)
            const task = await AppDataSource.manager.findOneBy(Task, {
                id: input_task_number_int,
            });
             
            // terima input dari pengguna
            const input_task_name = prompt("Masukkan Nama Task yang baru: ");

            // perbaharui data yang dimaksud oleh pengguna
            task.name = input_task_name;
            await AppDataSource.manager.save(task);
            console.log("Daftar Tugas Diperbaharui");
        } else if (input_menu == Number(4)) {
            console.log("Melakukan Operasi Melakukan Hapus Tugas");
            // tampilkan aksi menerima input nomor task yang ingin dihapus
            // cari data yang ingin dihapus
            // hapus data
            // tampilkan pesan ke pengguna bahwa data telah dihapus
        } else if (input_menu == Number(5)) {
            console.log("Melakukan Operasi Melakukan Selesai Tugas");
            // tampilkan aksi menerima input nomor task yang ingin diubah
            // cari data yang diinginkan oleh pengguna
            // merubah is_done dari false menjadi true
            // perbaharui data yang dimaksud oleh pengguna
        } else if (input_menu == Number(0)) {
            console.log("Terimakasih telah menggunakan applikasi kami");
            return process.exit(1);
        }
    } while (parseInt(input_menu) >= 1 && parseInt(input_menu) <= 5 );
}).catch(error => console.log(error))
