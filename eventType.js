import avro from 'avsc'

export default avro.Type.forSchema({
    type:'record',
    fields:[
        {
            name:'animal',
            type:{type:'enum', symbols:['CAT', 'DOG']}
        },{
            name:'noise',
            type:'string'
        }
    ]
})