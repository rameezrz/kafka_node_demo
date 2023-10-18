console.log("producer");

import Kafka from "node-rdkafka";
import eventType from "../eventType.js";

const stream = Kafka.Producer.createWriteStream({
    "metadata.broker.list": "localhost:9092"},{},{topic:"test"}
)

const getRandomAnimal = ()=>{
    const categories = ['CAT', 'DOG']
    return categories[Math.floor(Math.random() * categories.length)]
}

const getRandomNoise = (animal)=>{
    if(animal === 'CAT'){
        const noises = ['purr','meow']
        return noises[Math.floor(Math.random() * noises.length)]
    }else if(animal === 'DOG'){
        const noises = ['woof','bark!']
        return noises[Math.floor(Math.random() * noises.length)]
    }
}

const messageQueue = ()=>{
    const animal = getRandomAnimal()
    const noise = getRandomNoise(animal)
    const event = {animal, noise}
    const success = stream.write(eventType.toBuffer(event))
    if(success){
        console.log("Message wrote successfully to stream...")
    }else{
        console.log("Something went wrong...");
    }
}

setInterval(() => {
    messageQueue()
}, 3000);