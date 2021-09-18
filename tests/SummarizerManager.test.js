const SummarizerManager = require("../src/SummarizerManager");
let fs = require("fs");

let content = fs.readFileSync(__dirname + "/test.txt", 'utf8');
let content2 = fs.readFileSync(__dirname + "/test2.txt", 'utf8');


jest.setTimeout(30000);
describe('SummarizerManager.js', () => {
  test('Gets the sentiment analysis', async () => {
    let Summarizer = new SummarizerManager(content2, 3);
    let summary_obj = await Summarizer.getSummaryByRank();
    expect(typeof (Summarizer.getSentiment())).toBe("number");
  });

  test('Makes sure that there are no errors in the random walk', async () => {
    for (let i = 0; i < 500; i++) {
      let Summarizer = new SummarizerManager(content, 5);
      let summary_obj = await Summarizer.getSummaryByRank();
      expect(typeof (summary_obj.summary)).toBe('string');
    }
  })

  test('Makes sure that there are no errors in frequency approach', () => {
    for (let i = 0; i < 500; i++) {
      let Summarizer = new SummarizerManager(content, 5);
      let summary_obj = Summarizer.getSummaryByFrequency();
      expect(typeof (summary_obj.summary)).toBe('string');
    }
  })

  test('Makes sure that it handles edge cases', async () => {
    let Summarizer = new SummarizerManager("...", 0);
    let summary_obj = Summarizer.getSummaryByFrequency();
    expect(typeof (summary_obj.summary)).toBe('object');

    for (let i = 0; i < 15; i++) {
      summary_obj = Summarizer.getSummaryByFrequency();
      expect(typeof (summary_obj.summary)).toBe('object');
    }

    let rank_summary = await Summarizer.getSummaryByRank();
    expect(typeof (rank_summary.summary)).toBe('object');

    for (let i = 0; i < 15; i++) {
      rank_summary = await Summarizer.getSummaryByRank();
      expect(typeof (rank_summary.summary)).toBe('object');
    }

  })

  test('Handles book doc', async () => {
    const testDoc = [
      '"Ah, I should send you to the shed, you are slow . . . and lazy." An older man scoffed, the Duke of Haughton, putting up his feet on an ottoman made of wood and animal fur, waving his hand at his servant.',
      'The old man wore a red suit made of cotton, with a white shirt of silk. His polished, pristine, boots were placed on the floor next to the ottoman. He had a warm, thick, blanket dragged over his feet and legs to help keep him warm.',
      `"Ahh, gaaa. . . Dogs, you'll be caring for dogs with your attitude." He shuffled in his tall chair, uncomfortably adjusting his position, struggling to move.`,
      'The Duke was an ill-tempered man in his old age. Constantly threatening the staff, occasionally sending a man to the rope to make an example.',
      `"Anything else sir?" A small, younger man responded politely, he had been this man's first servant now for four years and was used to the abuse.`,
      'The young servant was wearing a black suit made of cotton, with an ivory cotton shirt, black leather boots that appeared more worn than new. The boots were pocked with mud stains and scuffs from years of use.',
      'The stone walls flickered reflecting the fire that raged above a large hearth made of a speckled and polished white marble, the walls around the fireplace were matching stone. Above the fire was a great wooden mantle, cut from an oak tree, darkened with days of oil soaking and staining.',
      'Above the mantle, was a large painting. The Duke had it commissioned in 1835 by the famous Italian painter, Giovanni Sadanni. It was a vibrant painting of a country landscape, as requested by the Duke. It depicted his rolling hills with bright green blades of grass that seemed to be moving in a gentle breeze. Trees on the edges of rolling fields were turning subtle yellows and oranges from fall temperatures.',
      'A small cottage sat atop one of the far hills with a single stack of smoke perpetually stuck emanating from its small chimney.',
      '"Get it for me. Damn it. Get it for me." The Duke grunted sitting up in his chair slightly and looking at the servant with disdain while motioning with a large key chain that he slipped off a clip from his belt.',
      '"Yes sir." The servant collected the keys from the Duke and moved to a large oak hutch that sat to the right of the fireplace. He used the key to open up a cabinet that exposed a large, built-in, metal panel and another keyhole. The servant switched to the second key on the chain and opened the iron door.',
      '"Yes, yes, bring it directly to me." The Duke demanded anxiously.',
      'The servant reached inside of the large iron box, gently, he slid out an object wrapped in a red cloth. The object was about twice the length of his hand and weighed more than one would expect. He placed it down gently on the shelf of the hutch, slowly he unwrapped the cloth.',
      "The servant's eyes widened. He had seen the dagger many times before, each time felt as if it was the first. It had a way to mesmerize anyone who looked at it. Spurring thoughts of violence.",
      "He picked it up and held it in his hands. The large gems glinted from the firelight. The dagger had a golden hilt, with small blue gems expertly set to improve one's grip.",
      'The servant wrapped his hands around the hilt. It was surprisingly well-weighted, he marveled at the gems and the comfort they afforded him. Holding the knife up, he admired the sharp, double blade that came together at the tip.',
      'The guard spread out like open arms. Large blue gems sat on both ends of the guard with a large green stone adorning the center. Holding up the knife he marveled that the way the stone reflected the light.',
      '"Bring it to me, you dog." The Duke yelled for his dagger.',
      'The servant turned and moved slowly towards the Duke with his eyes fixed on the blade.',
      'The knife was known as the Blade of Haughton Castle. It had been said that the man who wields the dagger, has power beyond the reach of mortal men. Servants had long rumored that the Duke himself became powerful, only possession of the dagger, and, without it he would be powerless. It had a way of mesmerizing people, inciting violence from those wielding it.',
      `"Give it to me!" The Duke's voice escalated as the servant hesitated a moment.`,
      '"Of course sir." The servant moved towards him at a quicker pace and held the dagger out for the Duke to take it, flipping the hilt towards the Duke.',
      '"Ah, my precious." The Duke reached for the dagger, his eyes giddy. The servent pulled back.',
      `"What's the matter with you. I'll have you hanged for disobedience." The Duke hissed.`,
      'The servant moved behind the Duke, who struggled to turn his large body around.',
      `"You rat, you, you, I swear it you're, you're . . . guards!" The Duke yelled for help.`,
      "The servant didn't say anything, his eyes continued to be fixed on the dagger. He stood behind the Duke, raising the dagger high up into the air above his head. With one strong motion, he brought it down and into the Duke.",
      '"Aahhhsch" The Duke cried out.',
      'The tip entered the Duke where the shoulder and neck meet on the left side. The servant felt the dagger push halfway down, then stop, hitting a rib. He pulled up on the dagger slightly, leaned forward, and put more of his weight into the downward thrust. This time the dagger slipped past the bone piercing deep into the Duke, the tip easily slicing into the heart.',
      'The servant twisted the knife, widening the hole that it made, blood began to boil out of the enlarging hole in pulses. First strong and rapid, then weaker and weaker.',
      'After a long moment of hissing and grunting the Duke went silent, his body limp. The servant pulled the dagger out and wrapped it back in the red cloth before tucking it into his belt and covering it with his coat.',
      "The servant looked at the Duke's lifeless body. He felt possessed as if the dagger had made him do it. He felt compelled to do something to cover his crime.",
      'He moved towards the wall and pulled down a hanging, square lantern. The frame of the lantern had been made from iron, with glass panels on the faces. It had a circular container inside with a wick protruding from the top of the tube. The lantern had not been lit yet as the sun was still on the horizon.',
      "The servant opened up the lantern, twisted the small hand-turned nob to release the tube. He put the lantern back on the floor next to the Duke before twisting open the cap. He poured the flammable oils over the Duke's chest, down towards his feet, before the tube ran empty.",
      'Next, he picked up a log from the fireplace and tossed it onto the Duke. His body lit on fire just as soon as the log landed making an audible "poof" as the fire spread quickly.',
      "Timothy watched the fire crackle and spread. First the chair, ottoman, then floor rug, hutch, curtains. He stepped back towards the door slowly, unable to stop watching, as the Duke's skin began to boil, pop, and char. He had never watched a body burn before.",
      'Soon Timothy heard screams echoing in his head. They were close but sounded so far away to him.',
      `"Fire! Fire! FIRE!" A woman grabbed his shoulder and pulled him back from the room. "What's wrong with you! Get water!" She screamed, knocking him out of his foggy dream-like state.`,
      '"Fire!" He yelled with the woman, turning, running down the hall. "Fire, Fire!" Timothy yelled into every chamber to warn of the danger.',
      'Water, water. Timothy repeated in his head as he ran outside and towards the largest well of the estate.',
      'It was a circular stone well that was hand-built not four years earlier. It had a large hand-crank that offered the ability to raise three large buckets of water at a time from the depths below.',
      'Timothy peered down for a long moment. He considered cutting the rope to sabotage firefighting capabilities. He wanted the old man to burn as long as possible.',
      '"You!" Timothy was startled. Turning his head he saw three guards approaching quickly.',
      '"You there!" They howled at him again.',
      'They know, what proof do they have. The knife! Timothy thought as panic boiled inside of him. He shifted awkwardly around the well, going through the motions of setting the ropes up for drawing water.',
      'He turned slightly to them so that his back was presented. Ignoring their calls, he quickly slipped out the bloody knife and dropped it into well.',
      '"You there, we need water! There is a fire." One of the guards reached him panting grabbing the rope from him.',
      `"Didn't you hear us? We want to form a water line."`,
      '"Ah, of course, yes, I was getting the line prepared", Timothy answered slowly.',
      `"Get more buckets." The guard pushed him away from the well, seemingly angry with Timothy's slow responses.`,
      `"Get more buckets." The guard pushed him away from the well, seemingly angry with Timothy's slow responses.`,
      'By the time the fire was put out, there was almost nothing left of the Duke but charred remains. Three rooms had been turned into rubble with the roof burning off, wall framing collapsed. Only stone wall sections remained.',
      'Timothy went back to the smoldering room to see what he had done. Surprised, the only thing in the room untouched by flame was the painting, stained from ash residue, but still hanging unscorched on the chimney wall.',
      'Timothy tried to forget the knife. But it had a way of nudging back into his thoughts. He went weeks ignoring it. If they find you with it, it will be the noose, he thought. No, you could get away, use it, become powerful. ',
      'Back and forth his thoughts raced, until one day, he decided, he committed to getting the knife and leaving this place.',
      'He waited until the darkest hours of the night when hardly anyone was awake or in need of water. He did not know how he was going to retrieve the knife, nor how deep the well was, or how deep the water would be. All he knew, was he had to get down there and retrieve the knife.',
      'He put his feet into two buckets, hugging the rope, holding onto the draw rope to descend himself slowly. The draw rope also offered him support, preventing him from easily tumbling down.',
      "He moved slowly, letting a little rope slip through the leather riding gloves he was wearing to prevent rope burn, he had stolen that earlier from the Duke's stables.",
      'About halfway down, he looked up and could see the opening of the well had seemed to have shrunk, Is it closing on me?  He mused, determined to reach the bottom.',
      'Peering down he could now see the water reflecting the moonlight.',
      'Suddenly, the rope started to shake. No! His mind yelled, his hand trying to hold onto the draw rope. It was now being pulled in the opposite direction, he began to raise. Someone was pulling it back up, probably unaware he was dangling on the buckets.',
      'No, no, no! He was so close, nearly at the bottom. He looked down, twisting unevenly with the pullback towards the surface making it difficult for him to keep balance. On a strong turn of the crank, he slipped forwards, one hand still on the rope, the other pushing off the stone wall. He was spinning uncontrollably due to his misbalance in the pail.',
      'He finally got himself back to center, but the spinning was almost unbearable to him. He became disoriented. Unsure if he was going to be able to hold on, he needed to do something. There was another rope for a third bucket with a hook on the end. He grabbed it, planning to loop it around this waist.',
      'Timothy pulled the hook up and fixed it against itself, then he began to slip it over his head and attempt to get the loop towards his waits. Just then, another heavy crank jolted the line. He bounced and slipped backward, the rope only around his neck.',
      'He had one foot in a bucket, the other foot reaching down for something, anything, naturally looking for ground to push up against. He twisted as the rope spun him out and away from the center-line. The more he struggled the more the loop seemed to tighten around his neck.',
      'He tried to lift himself up, but, with one foot stuck in a bucket, awkwardly dancing away from him, the effort proved impossible.',
      'Slowly, the rope exhausted him of oxygen, staring up at the spinning opening above, he felt his arms give up, losing strength. His mind told him to fight, to push, to pull. But, his body disobeyed.',
      'Timothy watched as the surface came closer and closer with every pull, where he could just make out two men working the crank above him. Then, his other boot slipped out of the bucket it was previously wedged in.',
      "The jolt of becoming unwedged sent his body weight down in a sudden drop. He felt as if his head was nearly stretched off from his body, hearing a crack in his neck as swung violently against the walls. He couldn't look up anymore, nor to the sides. His eyes felt as though they bulged out from his skull, locked looking forward. Darkness surrounded him."
    ];
    let Summarizer = new SummarizerManager(testDoc.join(" "), 5);
    const results = await Summarizer.getSummaryByRank();
    expect(results).toBeTruthy()
  })

  test('Tests the getFrequencyReduction() function', async () => {
    let Summarizer = new SummarizerManager("This is a single sentence. This is a single sentence.", 1);
    let reduction = Summarizer.getFrequencyReduction();
    expect(reduction.reduction).toBe("50.9%");

    let Summarizer2 = new SummarizerManager("This is a single sentence. This is a single sentence.", 1);
    let summary = Summarizer2.getSummaryByFrequency();
    let reduction2 = Summarizer.getFrequencyReduction();
    expect(reduction2.reduction).toBe("50.9%");

    let Summarizer3 = new SummarizerManager("This is a single sentence. This is a single sentence.", 1);
    let summary2 = await Summarizer2.getSummaryByRank();
    let reduction3 = Summarizer.getFrequencyReduction();
    expect(reduction3.reduction).toBe("50.9%");

  })

  test('Tests the getRankReduction() function', async () => {
    jest.setTimeout(30000);
    let Summarizer = new SummarizerManager("This is a single sentence. This is a single sentence. This is not", 1);
    let reduction = await Summarizer.getRankReduction();
    expect(typeof (reduction.reduction)).toBe('string');

    let Summarizer2 = new SummarizerManager("This is a single sentence. This is a single sentence.", 1);
    let summary = await Summarizer2.getSummaryByRank();
    let reduction2 = await Summarizer.getRankReduction();
    expect(typeof (reduction2.reduction)).toBe('string');

    let Summarizer3 = new SummarizerManager("This is a single sentence. This is a single sentence.", 1);
    let summary2 = Summarizer2.getSummaryByFrequency();
    Summarizer.getRankReduction().then((data) => {
      let reduction3 = data;
      expect(typeof (reduction3.reduction)).toBe('string');
    })


  })

  test("Final test to test everything", () => {

  })
})
