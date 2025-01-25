// See https://www.cloudgeometry.com/blog/hugging-face

import { HfInference } from '@huggingface/inference'
import dotenv from 'dotenv'

dotenv.config()

const inference = new HfInference(process.env.HF_ACCESS_TOKEN)
const model = 'nlpconnect/vit-gpt2-image-captioning' 
const imageUrl = 'https://occ-0-8407-1723.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABUHYaGjdaHcKoWimFiYulXgL9KQvx5PeeIMpKkCQOUEHmg6Mus77cLoR1phjA0rh-f_2b8kI7IPZ128JyjFICmTbMXt25gvD1Nnk.jpg?r=732'

let response = await fetch(imageUrl)
let imageBlob = await response.blob()

const results = await inference.imageToText({
  data: imageBlob,
  model: model,
})

console.log(results)
