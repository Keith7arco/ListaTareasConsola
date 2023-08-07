import inquirer from 'inquirer'
import colors from 'colors';

const questions=[
    {
        type:'list',
        name:'opcion',
        message:'¿Que desea hacer?',
        choices: [
            {
                value:'1',
                name:`${' 1. '.red}Crear una tarea.`
            },
            {
                value:'2',
                name:`${' 2. '.red}Listar tareas.`
            },
            {
                value:'3',
                name:`${' 3. '.red}Listar tareas completadas.`
            },
            {
                value:'4',
                name:`${' 4. '.red}Listar tareas pendientes.`
            },
            {
                value:'5',
                name:`${' 5. '.red}Completar tarea(s).`
            },
            {
                value:'6',
                name:`${' 6. '.red}Borrar tarea.`
            },
            {
                value:'0',
                name:`${' 0. '.red}Salir.\n`
            }
        ]
    }
];


const inquirerMenu = async()=>{
    
    console.clear();
    console.log('========================'.yellow);
    console.log(' Seleccione una Opcion'.yellow);
    console.log('========================\n'.yellow);

    //Desestructuracion del objeto
    const { opcion }=await inquirer.prompt(questions);
    return opcion;
}

const pausa = async()=>{

    const question=[
        {
            type:'input',
            name:'enter',
            message:`Presione ${'ENTER'.red} para continuar`
        }
    ]

    await inquirer.prompt(question);
}

const leerInput= async(message)=>{
    const question=[
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]
    const { desc } =await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = [])=>{
    //MAP retorna un nuevo arreglo pero transformandolo a hijos,osea a lo que quiero.
    const choices= tareas.map( (tarea,i) =>{
        const idx = `${i+1}.`.green;
        //Configurandolo como lo quiero mapear.
        return {
            value:tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value:'0',
        name:'0.'.red + ' Cancelar'
    });

    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices
        }
    ]
    const { id }=await inquirer.prompt(preguntas);
    return id;
}

const confirmar=async(message)=>{
    const pregunta = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarCheckList = async(tareas = [])=>{
    //MAP retorna un nuevo arreglo pero transformandolo a hijos,osea a lo que quiero.
    const choices= tareas.map( (tarea,i) =>{
        const idx = `${i+1}.`.green;
        //Configurandolo como lo quiero mapear.
        return {
            value:tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked:(tarea.completadoEn)? true:false
        }
    });

    const pregunta = [
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices
        }
    ]
    const { ids }=await inquirer.prompt(pregunta);
    return ids;
}




export {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarCheckList
}