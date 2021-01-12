//list of answers
const seasons = [
    "autumn",
    "winter",
    "spring",
    "summer"
]

//randomly select a season to guess
function randomSeason() {
    return seasons[Math.floor(Math.random() * seasons.length)]
}

export {randomSeason}