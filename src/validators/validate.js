export function validate(schema, target = 'body') {
    return (req, res, next) => {
        const data = req[target];

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No data found' });
        }
        const { error, value } = schema.validate(data, {
            abortEarly: false, //Muestra todos los errores
            stripUnknown: true, //Elimina los campos que no estan en el schema
        });

        if (error) {
            return res.status(400).json({
                message: `Error de validacion en ${target}`, 
                errores: error.details.map(err => err.message) 
            });
        }
        
        req[target] = value;
        next();
    };
}