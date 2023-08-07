import fs from 'fs';
const archivo='./db/data.json';

const guardarDB = (data)=>{
    //Objeto JSON con methodo Stringify, convierte un objeto en su version json valida como string.
    fs.writeFileSync(archivo,JSON.stringify(data));
}

const leerDB = ()=>{
    if(!fs.existsSync(archivo)){
        return null;
    }
    const info = fs.readFileSync(archivo,{ encoding:'utf-8'});
    const data = JSON.parse(info)
    
    return data;
}

export {guardarDB,leerDB}



