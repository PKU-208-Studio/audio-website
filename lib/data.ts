import type { GenreId, LocalizedText, Story } from "@/lib/types";

export const genres: Array<{
  id: GenreId;
  number: string;
  name: LocalizedText;
  description: LocalizedText;
  color: string;
}> = [
  {
    id: "noir",
    number: "01",
    name: { en: "SCREEN ROMANCE", zh: "银幕恋曲" },
    description: {
      en: "Fame, longing, and one scene too close to fake.",
      zh: "名望、暗恋，还有一场太过真实的假戏。",
    },
    color: "#c54635",
  },
  {
    id: "thriller",
    number: "02",
    name: { en: "SLOW-BURN YOUTH", zh: "青春慢热" },
    description: {
      en: "A transfer student, a rebel genius, and years of waiting.",
      zh: "转学生、天才少年，和漫长的等待。",
    },
    color: "#c19a4b",
  },
  {
    id: "sci-fi",
    number: "03",
    name: { en: "CONSPIRACY THRILLER", zh: "阴谋惊悚" },
    description: {
      en: "A cold case, a red dress, and the network beneath it.",
      zh: "悬案、红裙，与其下方的整张网络。",
    },
    color: "#6c9ab8",
  },
  {
    id: "dark-romance",
    number: "04",
    name: { en: "PROGRESSION FANTASY", zh: "成长奇幻" },
    description: {
      en: "Discipline, grief, and a champion built on cadence.",
      zh: "纪律、旧恨，以及被训练出来的冠军。",
    },
    color: "#b65a8b",
  },
  {
    id: "horror",
    number: "05",
    name: { en: "MIAMI FAMILY DRAMA", zh: "迈阿密家族戏" },
    description: {
      en: "Return with a husband, and make the whole city watch.",
      zh: "带着丈夫归来，让整座城都看着。",
    },
    color: "#aeb3b7",
  },
];

const audio = ["/audio/prologue.m4a", "/audio/chapter-one.m4a", "/audio/chapter-two.m4a"];

const createEpisodes = (
  storyId: string,
  titles: Array<[string, string]>,
  descriptions: Array<[string, string]>,
): Story["episodes"] =>
  titles.map(([en, zh], index) => ({
    id: `${storyId}-e${index + 1}`,
    storyId,
    number: index + 1,
    title: { en, zh },
    description: {
      en: descriptions[index]?.[0] ?? "The pressure rises before anyone is ready.",
      zh: descriptions[index]?.[1] ?? "在所有人准备好之前，压力已然升高。",
    },
    durationSeconds: [79, 94, 88][index % 3],
    audioSrc: audio[index % audio.length],
    isFree: index < 2,
  }));

export const stories: Story[] = [
  {
    id: "story-cn0002-p02",
    slug: "off-script",
    genre: "noir",
    title: { en: "Off Script", zh: "戏外真心" },
    eyebrow: { en: "CN0002 · P02", zh: "CN0002 · P02" },
    logline: {
      en: "A rising actor signs away his paycheck to stand beside the movie star he has loved for years.",
      zh: "一位新晋演员放弃片酬，只为站到暗恋多年的影帝身边。",
    },
    description: {
      en: "On a prestige film set in Los Angeles, Noah Quinn and Ethan Vale are told to fake intimacy for the camera. The problem is that only one of them is pretending.",
      zh: "在洛杉矶一部文艺电影的片场里，Noah Quinn 与 Ethan Vale 被要求为镜头制造亲密。问题是，他们之中只有一个人在演戏。",
    },
    author: "Adapted from CN0002-P02",
    narrator: "Demo Cast A",
    year: 2026,
    rating: 4.9,
    mature: true,
    accent: "#c54635",
    posterVariant: 1,
    posterImageSrc: "/posters/CN0002-P02-poster.png",
    posterImagePosition: "center 34%",
    episodes: createEpisodes(
      "story-cn0002-p02",
      [
        ["The Role He Took for Free", "零片酬接下的角色"],
        ["The Text Meant for Someone Else", "发错人的那条短信"],
        ["Kiss Scene at Midnight", "午夜吻戏"],
      ],
      [
        ["Noah steps onto Ethan's set and calls it a career move.", "Noah 走进 Ethan 的片场，把一切说成职业选择。"],
        ["One late-night message changes the distance between them.", "一条深夜短信，让两人的距离彻底改变。"],
        ["The cameras stop rolling, but the tension does not.", "镜头停下了，暧昧却没有停。"],
      ],
    ),
  },
  {
    id: "story-cn0013-p02",
    slug: "little-dimple",
    genre: "thriller",
    title: { en: "Little Dimple", zh: "小酒窝" },
    eyebrow: { en: "CN0013 · P02", zh: "CN0013 · P02" },
    logline: {
      en: "A quiet transfer student is seated beside the one boy everyone warns her about.",
      zh: "安静的转学生，被安排坐在所有人都在提醒她远离的男孩旁边。",
    },
    description: {
      en: "Chloe Harper wants perfect grades and a stable life. Zane Walker wants everyone to underestimate him. Their desk-mate truce becomes the slowest, sweetest fight either of them has ever lost.",
      zh: "Chloe Harper 只想拿到好成绩，过上稳定的新生活；Zane Walker 则想让所有人继续低估自己。一场同桌协议，慢慢变成他们谁也不愿认输的心动拉锯。",
    },
    author: "Adapted from CN0013-P02",
    narrator: "Demo Cast B",
    year: 2026,
    rating: 4.8,
    mature: false,
    accent: "#c19a4b",
    posterVariant: 2,
    posterImageSrc: "/posters/CN0013-P02-poster.png",
    posterImagePosition: "58% center",
    episodes: createEpisodes(
      "story-cn0013-p02",
      [
        ["Desk in the Last Row", "最后一排的座位"],
        ["He Was Never Failing", "他从来没在落后"],
        ["Five Years of Silence", "沉默的五年"],
      ],
      [
        ["Chloe enters Northwood High and lands beside Zane Walker.", "Chloe 转入 Northwood High，坐到了 Zane Walker 身边。"],
        ["The school rebel turns out to be the sharpest mind in the room.", "全校口中的坏学生，原来是教室里最聪明的人。"],
        ["Love survives distance only if both of them choose it twice.", "一段感情能否熬过离别，取决于他们是否愿意再选彼此一次。"],
      ],
    ),
  },
  {
    id: "story-cn0006-p03",
    slug: "silver-mirror",
    genre: "sci-fi",
    title: { en: "Silver Mirror", zh: "银镜" },
    eyebrow: { en: "CN0006 · P03", zh: "CN0006 · P03" },
    logline: {
      en: "A ritual murder in a red dress drags a buried witness back into the light.",
      zh: "一桩红裙仪式杀人案，把一名被埋藏多年的幸存者重新拖回光下。",
    },
    description: {
      en: "Detective Jiang He and profiler Shen Mo reopen a fifteen-year cold case and uncover Silver Mirror, a network that turned abuse into an institution and memory into evidence.",
      zh: "侦探江禾与侧写顾问沈默重启一桩十五年前的旧案，也掀开了“银镜”这个把虐待制度化、把记忆变成证据的庞大网络。",
    },
    author: "Adapted from CN0006-P03",
    narrator: "Demo Cast C",
    year: 2026,
    rating: 4.9,
    mature: true,
    accent: "#6c9ab8",
    posterVariant: 3,
    posterImageSrc: "/posters/CN0006-P03-poster.png",
    posterImagePosition: "40% center",
    episodes: createEpisodes(
      "story-cn0006-p03",
      [
        ["The Red Dress Reopens", "红裙案重启"],
        ["What Lingbei Buried", "岭北埋下的真相"],
        ["A Witness Who Survived", "活下来的证人"],
      ],
      [
        ["A staged murder forces Jiang He back into a case that never closed.", "一场被精心设计的谋杀，让江禾再次回到从未真正结束的旧案。"],
        ["Every clue points toward the sanatorium no one wants to name aloud.", "所有线索都指向那座没人愿意说出口的疗养院。"],
        ["The conspiracy stops being theory when Jiang He remembers where she stood.", "当江禾终于记起自己曾站在哪里，阴谋就不再只是猜测。"],
      ],
    ),
  },
  {
    id: "story-cn0007-p01",
    slug: "broken-sword",
    genre: "dark-romance",
    title: { en: "Broken Sword", zh: "断剑" },
    eyebrow: { en: "CN0007 · P01", zh: "CN0007 · P01" },
    logline: {
      en: "A fallen prodigy trains an orphan heir through a cultivation schedule sharp enough to cut stone.",
      zh: "一位失势天才，用近乎冷酷的修炼节律，把一个孤儿训练成足以改命的继承者。",
    },
    description: {
      en: "Gu Yuan discovers Shen Du in a servant yard and turns grief into doctrine. Every breakthrough, every duel, and every platform in the tournament is another step toward the truth of his mother's murder.",
      zh: "顾渊在杂役院里发现了沈渡，把旧日亏欠全都变成训练法则。每一次突破、每一场对决、每一层擂台，都是通往母亲被害真相的下一步。",
    },
    author: "Adapted from CN0007-P01",
    narrator: "Demo Cast D",
    year: 2026,
    rating: 4.7,
    mature: false,
    accent: "#b65a8b",
    posterVariant: 4,
    posterImageSrc: "/posters/CN0007-P01-poster.png",
    posterImagePosition: "56% 34%",
    episodes: createEpisodes(
      "story-cn0007-p01",
      [
        ["The Boy in the Servants' Yard", "杂役院里的少年"],
        ["Train to the Bell", "照着钟声去修炼"],
        ["Nine Platforms to the Top", "九层擂台"],
      ],
      [
        ["Gu Yuan hears a forbidden stance in the dirt and knows her debt has returned.", "顾渊在泥地里看见一式禁招，知道自己欠下的债回来了。"],
        ["Shen Du learns that progress is not talent, but cadence under pain.", "沈渡明白了，真正的成长不是天赋，而是痛苦中的节律。"],
        ["The tournament is the shortest path to vengeance, if he survives it.", "只要能活下来，擂台就是通往复仇最近的路。"],
      ],
    ),
  },
  {
    id: "story-cn0003-p07",
    slug: "when-sofia-returned",
    genre: "horror",
    title: { en: "When Sofia Returned", zh: "索菲娅归来时" },
    eyebrow: { en: "CN0003 · P07", zh: "CN0003 · P07" },
    logline: {
      en: "She left the family that used her. She came back with a husband and the receipts.",
      zh: "她离开了利用她的家族，回来时带着丈夫，也带着所有证据。",
    },
    description: {
      en: "Sofia Rivera's return to Miami forces Adrian de la Vega, his mother, and the whole social circuit to face what gratitude once concealed: class control, unpaid labor, and the price of being loved only conditionally.",
      zh: "索菲娅回到迈阿密后，Adrian de la Vega、他的母亲，以及整个上流社交圈都不得不直面一个曾被“感恩”掩盖的事实：阶级控制、无偿劳动，以及有条件的爱究竟要付出什么代价。",
    },
    author: "Adapted from CN0003-P07",
    narrator: "Demo Cast E",
    year: 2026,
    rating: 4.8,
    mature: true,
    accent: "#aeb3b7",
    posterVariant: 5,
    posterImageSrc: "/posters/CN0003-P07-poster.png",
    posterImagePosition: "52% 26%",
    episodes: createEpisodes(
      "story-cn0003-p07",
      [
        ["The Night She Walked Out", "她离开的那一夜"],
        ["Coral Gables Remembers", "珊瑚阁仍记得她"],
        ["The Husband at Her Side", "站在她身边的丈夫"],
      ],
      [
        ["Sofia leaves the estate before Adrian understands what he lost.", "在 Adrian 终于意识到失去了什么之前，Sofia 就已经离开了那座宅邸。"],
        ["Miami's elite society turns her return into public theatre.", "迈阿密的上流社交圈，把她的归来变成了一场公开审判。"],
        ["Mateo is not a prop in the scandal. He is the first safe choice she has ever had.", "Mateo 不是这场丑闻里的道具，而是她第一次拥有的安全选择。"],
      ],
    ),
  },
];

export const featuredStory = stories[0];

export const storyBySlug = (slug: string) =>
  stories.find((story) => story.slug === slug);

export const storyById = (id: string) =>
  stories.find((story) => story.id === id);

export const episodeById = (episodeId: string) => {
  for (const story of stories) {
    const episode = story.episodes.find((item) => item.id === episodeId);
    if (episode) return { story, episode };
  }
  return undefined;
};
