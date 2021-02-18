const { id } = req.params;  
const { days } = req.params;  
let sql

var response;


sql = `select id, id_radar, movement, hour from radar_movement where id_radar = ${id} limit 3`

const movement = await sequelize.query(sql,
    {
        type: sequelize.QueryTypes.SELECT,
    }
);

response = movement;    

const asyncForEach = async function (array, callback) {
    for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
    }
}

const intensity = function (id) {

    return new Promise((resolve, reject) => {
        
    sql = `select rmi.id_movement, rmi.sustained, rmi.gust, rd.cardeal 
        from radar_movement_intensity rmi 
        inner join radar_directions rd on rd.id = rmi.id_radar_directions 
        where rmi.id_movement = ${id}`
    
        sequelize.query(sql,
        {
            type: sequelize.QueryTypes.SELECT,
        }
        )
        .then(result => resolve(result))
        .catch((err) => {
            throw('Erro!' + err)
        });
    });
}


await asyncForEach(movement, async (element, index) => {
    response[index].intensity = await intensity(element.id);
})


return res.json(response);