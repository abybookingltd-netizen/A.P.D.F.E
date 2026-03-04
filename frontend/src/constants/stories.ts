import img6377 from '../assets/others/IMG_6377.jpeg';
import img6561 from '../assets/others/IMG_6561.jpg';
import img6412 from '../assets/others/IMG_6412.jpg';
import img6409 from '../assets/others/IMG_6409.jpg';

export interface Story {
    id: string;
    name: string;
    title: string;
    location: string;
    tag: string;
    shortText: string;
    fullText: string;
    img: string;
}

export const SUCCESS_STORIES: Story[] = [
    {
        id: "scars-purpose",
        name: "A Story by Eldorado Yangughno",
        title: "Happiness is not the absence of scars",
        location: "Central African Republic",
        tag: "Resilience",
        shortText: "Through structured psychosocial counselling and empowerment programs, she transformed from a survivor into a student leader and advocate against gender-based violence.",
        fullText: `Happiness is not the absence of scars; it is the presence of purpose. A story by Eldorado Yangughno. She stands before her classmates with a microphone in her hand, her voice steady, her eyes clear. A few years ago, this moment would have felt impossible. Born and raised in a rural community in the Central African Republic, she was like many other young girls, dedicated to her studies, supportive at home, and hopeful about her future. Every afternoon, she would walk long distances to collect firewood for her family.

It was during one of those ordinary days that her life changed. On her way back from the bush, she was sexually assaulted by a group of armed men associated with local labour units operating in the area. The trauma left deep wounds; physical, emotional, and psychological. She withdrew from school. She avoided her friends. Fear and shame overshadowed her dreams. For months, she lived in silence, battling depression and self-blame. In her community, stigma around sexual violence made it even harder to speak out.

Her turning point came when a team from Action Pour le Développement de la Femme et de L'Enfant (APDFE) visited her village during an outreach mission on gender-based violence prevention. Through confidential conversations and careful assessment, they identified her as a survivor in need of urgent support. APDFE provided her with structured psychosocial counselling, safe spaces for expression, and peer support groups where she met other girls with similar experiences. For the first time since the incident, she felt heard without judgment, without blame.

Beyond counselling, she was enrolled in APDFE's resilience and empowerment program. Through life-skills training, mentorship, and educational support, she slowly rebuilt her confidence. She learned about her rights, about bodily autonomy, about justice mechanisms, and about the power of collective advocacy. Most importantly, she began to see herself not as a victim, but as a survivor.

With APDFE's support, she returned to school. Her academic performance steadily improved, but what stood out most was her leadership. She volunteered to join the school's Anti-GBV Club and, within a year, was elected Chairperson. Today, she organizes awareness sessions, facilitates peer discussions on consent and protection, and works closely with teachers to ensure that reporting mechanisms are accessible to all students. Standing in front of her fellow students, she shares her testimony not to relive her pain, but to break the silence.

Her voice carries strength. She speaks about resilience, about seeking help, and about refusing to accept violence as normal. She reminds every girl that dignity is non-negotiable and that recovery is possible. Now, she is not only a student, she is an advocate. She dreams of becoming a social worker so she can support other survivors across the Central African Republic.

Her happiness today is not the absence of scars; it is the presence of purpose. Her journey is a testament to what comprehensive psychosocial support, community engagement, and structured resilience programming can achieve. With the right intervention, survivors do not only heal, they lead.`,
        img: img6377
    },
    {
        id: "wide-shade",
        name: "Women of Goma Village",
        title: "Under the wide shade of an old tree",
        location: "Goma, DRC",
        tag: "Empowerment",
        shortText: "In Goma Village, women have chosen a simple yet transformative path toward empowerment: sitting together, listening to one another, and building solutions from within their community.",
        fullText: `Under the wide shade of an old tree in Goma Village, in the eastern part of the Goma, women have chosen a simple yet transformative path toward empowerment: sitting together, listening to one another, and building solutions from within their community. Under the shade of large trees, on the open red soil that defines much of rural Democratic Republic of the Congo, small groups of women gather regularly on plastic chairs arranged in a circle. What may appear as an ordinary meeting is, in fact, a structured community approach to knowledge sharing on women's rights. These gatherings are safe spaces, places of trust, solidarity, and collective strength.

The initiative began with a few women who recognized that many in the village were facing similar challenges: limited awareness of their legal rights, domestic violence, unequal access to land, early marriage, and restricted participation in community decision-making. Instead of waiting for external actors to intervene, they adopted a peer-led model. They formed community groups where every member has a voice, and where learning is rooted in lived experience.

Each meeting follows a simple yet powerful structure. A facilitator, often one of the trained community champions, introduces a topic related to women's rights, such as inheritance laws, protection against gender-based violence, or access to education for girls. The discussion then opens to personal testimonies. Women share their stories openly, some with emotion, others with courage and determination. Through these stories, abstract rights become practical realities.

What distinguishes these groups is their emphasis on collective action. When a member faces a rights-based issue, the group does not leave her to struggle alone. They accompany her to local authorities, mediate family disputes, or connect her to available services. In cases of violence, they provide psychosocial support and ensure that cases are reported appropriately. When economic vulnerability is at the root of the problem, they organize savings schemes and small income-generating activities to strengthen financial independence.

The benefits have been significant. First, awareness has increased. Women who once believed certain injustices were "normal" now recognize them as violations of their rights. Second, confidence has grown. Members report feeling more capable of speaking in public forums and participating in village meetings. Third, solidarity has reduced isolation. Challenges that were once endured in silence are now addressed collectively.

Moreover, the groups have begun influencing broader community attitudes. Men and local leaders, initially sceptical, have gradually observed the positive outcomes: reduced family conflicts, improved household cooperation, and greater stability. As a result, dialogue between women's groups and community authorities has improved, strengthening local governance.

In my professional view, the strength of this approach lies in its sustainability. It does not depend solely on external funding or short-term projects. It builds on social capital relationships, trust, and shared responsibility. By anchoring knowledge in community structures, the women of Goma Village have created a replicable model of grassroots empowerment. Today, these gatherings are more than meetings; they are platforms of transformation. They demonstrate that when women are informed, organized, and united, they become powerful agents of change not only for themselves, but for their families and the entire village.`,
        img: img6561
    },
    // {
    //     id: "healing-together",
    //     name: "Community Healing",
    //     title: "Healing Together",
    //     location: "Rwanda",
    //     tag: "Community",
    //     shortText: "A group of 20 survivors formed a community healing circle that now supports over 200 women in their district.",
    //     fullText: "A group of 20 survivors formed a community healing circle that now supports over 200 women in their district. Working together, they provide peer support, share resources, and advocate for survivor rights at the local government level.",
    //     img: img6412
    // },
    // {
    //     id: "jeans-education",
    //     name: "Jean's Education",
    //     title: "A New School Year",
    //     location: "CAR",
    //     tag: "Education",
    //     shortText: "A former child soldier, Jean is now back in school and excelling in his studies through our rehabilitation and scholarship program.",
    //     fullText: "A former child soldier, Jean is now back in school and excelling in his studies through our rehabilitation and scholarship program. His story demonstrates the power of dedicated educational support in conflict recovery.",
    //     img: img6409
    // }
];
