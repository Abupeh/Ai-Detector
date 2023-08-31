
// the
// prompt: 6 good, 1 / 5 consenent to vowel ratio. 5, 5 * 6 = 30. 30 bad score. 6 * prev(3) = 18. 30/18 = 2 bad, so the score for the word is 2x bad.
//  x<4  = its a small-word, which is worth 0.5 points, giving you more score. 
// The aroma of freshly baked bread wafted through the cozy kitchen, making everyone's mouths water.
// the: 3 good, 1 / 2 ctv ratio. 2*3 = 6. 

import { readFileSync } from "fs";

const Vowels = /a|e|i|o|u|y/gm
const Uncounted = 4; 
type Words = string[];
function Detect(prompt: string, log = false) {
    const words: Words = prompt.split(' ');
    let prevScore = 1;
    const ratios = words.map(word => {
       const letters = word.split('');
        const length = letters.length;
        if(length < Uncounted) return 1;
        const vowels = letters.filter(letter => letter.match(Vowels));
        if(vowels.length == 0) return length;
        const ratio = (length - vowels.length) / vowels.length;
        const score = ratio * length;
        //Compare to old
        const compared = score / prevScore 
        if(prevScore == 1) return length;
        prevScore = score;
        return compared;
    })

    const sum = ratios.reduce((acc, val) => acc + val);
    const totalLength = words.reduce((acc, val) => acc + val.length, 0)
    const result = Math.floor((sum / totalLength) * 100)
    if(log) console.log(result + "%");
    return result
}
const text = readFileSync('public/text.txt', 'utf-8');
const result = Detect(text, true);
