import { GameLevel, getTotalLevel } from "../../../screens/production/GameScreen/utils";
import { ScreenTranslation } from "../../translation";

const translation: ScreenTranslation["SingleFeedback"] = {
  [GameLevel.Dust]: [
    "Oh! This is a level of dust grain... There's too much to go.",
    "...I'm sure this isn't the skill you saw? I believe it's not...",
    "Huh?? Really this grade comes out?? I just made it as a starting point??",
    "No hahaha, isn't this a little?",
    "Huh? No? Isn't this a real skill???"
  ],
  [GameLevel.Stone]: [
    "Well, it's just like a nice stone at this level... Still much to go.",
    "Huh, I know, you haven't taken out half of half of your ability yet. Right..?",
    "The TV AI in my house is just this much",
    "Too much to go...!",
    "Stone grade... are you a stone?",
  ],
  [GameLevel.Iron]: [
    "Oh ow... you're a scrap metal grade...",
    "Scrape grade... Are you satisfied with scrap metal?",
    "This is bad... There's much much much more to go",
    "This is exactly the same level as my hamster?",
    "Scrape grade. Are you a scrap metal?",
  ],
  [GameLevel.Bronze]: [
    "Oh, it's a better grade of dung iron than scrap",
    "Hey! It's a dung iron grade! Push yourself more!!",
    "Dung iron grade. Would you like to stop here?",
    "Dung iron grade. Actually, it should be considered a tutorial up to this point",
    "If I play with closed eyes, it will come out like this",
  ],
  [GameLevel.Silver]: [
    "LoL, if it's silver, you've just proven a normal level of brain",
    "This can be said to be very normal",
    "It's still normal. Please do it a little more.",
    "If I do it with my toes, it comes out just this much",
    "Very, very average. Just average.",
  ],
  [GameLevel.Gold]: [
    "I can say you're good at it, very little",
    "You're really, really, a little good. A little bit.",
    "Very little good. Really very little",
    "This is just a little about the average",
    "It's a really, really little good level"
  ],
  [GameLevel.Platinum]: [
    "You're doing a little. I praise you~",
    "You're good at it.",
    "You're a little good. Are you satisfied here?",
    "It's just like when I'm not good at it.",
    "Oh, you're doing quite a bit? I'm a bit surprised?",
  ],
  [GameLevel.Diamond]: [
    "Oh...? You are really good at it?",
    "What, why are you good? Why?",
    "You're really good at it... I admit it",
    "Wow... Dia? Just like me",
    "Wow wow... you're good",
  ],
  [GameLevel.Master]: [
    "??Um?? coming up to here??",
    "Wh...What? Master?? Really??",
    "hahahaha, you're really good at it!",
    "Master??? Wow I can't come this far",
    "Wow... If you just do a bit more, it's posthuman level??",
  ],
  [GameLevel.GrandMaster]: [
    "Honestly, I didn't know even if I had a dream in a dream that this grade would come out... ",
    "Wow... I think you're really good at this??? This is a possible grade???",
    "...I'm not this much... You're good. Change your brain with me.",
    "Wow, my heart becomes magnificent... (admiring)",
    "That...Grand Master??? Really?? You're really good..",
  ],
  [GameLevel.Challenger]: [
    "Reepy! Reepy! Extremely creepy! Really nonsense. You're a challenger???",
    "Aren't you hacking? This is possible??",
    "Wow, I'm really suprised. This is honestly impossible",
    "It's really, oh my god... a little bit post-human...",
    "It's almost like a superpower",
  ],
  [GameLevel.GrandChallenger]: [
    "??????... lies... I didn't thought it's possible",
    "Wow... it's a post-human level. Really",
    "Huh... I think this is a hack",
    "Wow... Your brain powers magnify my heart...",
    "I’m proud to be a human species like you",
  ],
  [GameLevel.Champion]: [
    "The real post-human level starts here",
    "The producer didn't even know!! This was a possible grade!!",
    "You used a hack, right?",
    "(...) salute for your skills",
    "I have a little respect.. awesome",
  ],
  [GameLevel.GrandChampion]: [
    "This is a real hack, right?",
    "Nice to meet you AI friend. I am B37492A293. What are you, your name",
    "Wouldn't you like to take lithium-ion batteries for lunch?",
    "What's the secret??? I think, you should do your brain, donated to NASA",
    "Don't lie. This is a level that can't come out..."
  ],
  [GameLevel.DemiGod]: [
    "Nice to meet you.. Are you close to Goddess Athena?",
    "Wow... I feels like choking",
    "Because it's really impossible??? There's no way this can be done!!",
    "Don't use it... How can a person come here...",
    "Wow... It's really creepy. Will one out of 10,000 people come",
  ],
  [GameLevel.God]: [
    "Hello God... can I make a wish??",
    "God.. I knew that you would existed..",
    "Where do you live? I will bow in that direction from now on",
    "Hey, I don't say it twice. Let's change your brain with me",
    "How do you get here??? Are you a human or a god??",
  ],
  [GameLevel.Atom]: [
    "Really nonsense...",
    "I was really surprised...",
    "Wow.... Wow.... Wow.... Wow...",
    "Are you, artificial intelligence...?",
    "I think you're an artificial intelligence or hacker...",
  ],
  [GameLevel.Nihil]: [
    "Don't do that! This is a level that can't be clerared. Really",
    "How can a mere human come here...",
    "Wow... humanity has just entered a new stage",
    "A new human race is born... This is really nonsense",
    "Would you be in 3000 AD?",
  ],
  rankText: (rank: number) => {
    const tail = (() => {
      if (rank % 10 === 1) return 'st';
      if (rank % 10 === 2) return 'nd';
      if (rank % 10 === 3) return 'rd';
      return 'th';
    })();
    return rank + tail;
  },
  rankDeclaration: (rank: number, total: number) => `You placed at ${rank} among ${total} people.`,
  forLast24Hour: "For last 24 hour",
  stageClearDeclaration: (diffiulty: number) => {
    const totalStage = getTotalLevel();
    return `You've cleared stage ${diffiulty} of total ${totalStage} stages.`
  }
}

export default translation;