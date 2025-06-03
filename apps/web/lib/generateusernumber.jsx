
import { UserModel } from '@repo/db/models/user';
import dbConnect from '@repo/db/lib/mongodb';

export async function usernumber (){
    // Conectar a la base de datos
    await dbConnect();

    // --- Lógica para generar el userNumber ---
            let nextUserNumber;
    
            // 1. Encontrar el usuario con el userNumber más alto
            // Ordenamos por userNumber de forma descendente (-1) y limitamos a 1
            const lastUser = await UserModel.findOne().sort({ userNumber: -1 }).limit(1);
    
            if (lastUser && lastUser.userNumber && !isNaN(lastUser.userNumber)) {
                nextUserNumber = parseInt(lastUser.userNumber) + 1;
            } else {
                nextUserNumber = 100001;
            }

    return nextUserNumber;

}
