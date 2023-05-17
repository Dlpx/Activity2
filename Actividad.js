import fs from 'fs'

class ProductManager {
    
    constructor(filename) {
        this.path = filename,
        this.format = 'utf-8'
    }

    #getUsers = async () => {
        return JSON.parse(await fs.promises.readFile(this.path, this.format))
    }

    createUser = async (name, age, phone) => {
        let fileExist = fs.existsSync(this.path)

        if(!fileExist){
            const startPoint = []
            await fs.promises.writeFile(this.path, JSON.stringify(startPoint))
        }
        
        const users = await this.#getUsers()
        let id = users.length + 1

        
        users.push({id, name, age, phone})
        
        return await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'))
    }
}


const addUser = new ProductManager('./Users.json');
addUser.createUser('Fiorella', 28, '959510595');