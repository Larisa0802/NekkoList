import Jikan from 'jikan4.js'


async function getAnimebyId(req, res){
    const client = new Jikan.Client()
    let arrayData = []
    for(let i = 1; i <= 1000; i++){
        const anime = await client.anime.get(i)
        if(anime){
            arrayData.push(anime)
        }else{
            console.log(`Anime with ID ${i} does not exist.`)
        }
    }
    // console.log(arrayData)
    // anime.id ; anime.image.ImageFormatCollection["jpeg"]; anime.title.ContentTitle["english"]; anime.titles??; anime.score; anime.synopsis; anime.type; anime.source; anime.episodes; anime.airInfo.AnimeAirInformation["status"]; anime.airInfo.AnimeAirInformation["airing"](false o true); anime.airInfo.AnimeAirInformation["airedFrom"]; anime.airInfo.AnimeAirInformation["airedTo"](can be null)
    res.send(arrayData).status(200)
   
}

// async function getAnimebyName(req,res){
//     const client = new Jikan.Client()
//     console.log(req)
//     const result = (await client.anime.search("Sousou no Frieren")).map((anime) => {
//         return {
//         title: anime.title.default,
//         year: anime.year
//         }
//     })


//     res.send(result).status(200)
//     console.log(result)

// }

export default {
        getAnimebyId,
    }