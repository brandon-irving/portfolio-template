function mapLinksToObjects() {
  const links = [
    'https://m.facebook.com/story.php?story_fbid=pfbid024rM5YZxNe8RmAow9ubMTjC1Jnf89whvYqBuWyfdbZpWqTSoN7TdfLasURFeYKM2vl&id=603884296395426&mibextid=qC1gEa',

    'https://www.facebook.com/grifolsplasma1940/posts/pfbid02eVVdJCQm4AVREJWMoC35d1U3yNLH5gvtN8AAZLYMQum429asw49tytksn88qj8vPl',

    'https://www.facebook.com/grifolsplasma1940/posts/pfbid0cjGutxWyNb3qoCXRW7odKW4b4VRUdzgrdiDkFT6mi4wjMGC3cMJKB18foH94Btkvl',

    'https://www.facebook.com/grifolsplasma1940/posts/pfbid0LuFic6aMf4RHZ2TyfuSYiQBVDqn3DeEXqZYnFfQc2EdtcX8gKy5VZeRyiuz1DUuMl',

    'https://www.facebook.com/grifolsplasma1940/photos/a.603993953051127/5176032829180527/type=3&mibextid=qC1gEa&paipv=0&eav=AfbA0rB30g_k3RtWLLB27mh0W5ROzp8mGlC4BFT8lajXybpTa4KZaQ-vMT6LtzXtJt8&_rdr',

    'https://www.facebook.com/grifolsplasma1940/photos/a.603993953051127/5185854148198395/',

    'https://www.facebook.com/grifolsplasma1940/photos/a.603993953051127/5196186283831848/',

    'https://www.facebook.com/grifolsplasma1940/photos/a.603993953051127/5228262243957585/',

    'https://www.facebook.com/grifolsplasma1940/photos/a.603993953051127/4916620668455079/',

    'https://www.facebook.com/grifolsplasma1940/photos/a.603993953051127/4956045204512625/',

    'https://www.facebook.com/grifolsplasma1940/photos/a.603993953051127/4956112611172551/?type=3&mibextid=qC1gEa&paipv=0&eav=AfaE78QSz9_BaDHe0RT_-K3tpCTDMN8hbaCRcrRqx86T2D_e68hSR3FwfKsoMrwXnNc&_rdr',

    'https://www.facebook.com/grifolsplasma1940/photos/a.603993953051127/4956175164499629/',
  ];
  const res = links.map((link, index) => ({
    image: `Image ${index + 1 + 21}.png`,
    link,
    date: '',
    title: `Post ${index + 21}`,
    company: '',
    tech: [],
    description: '',
  }));
  const fin = res.reduce((prev, curr, i) => ({ ...prev, [`post${i + 21}`]: curr }), {});
  console.log(fin);
}
mapLinksToObjects();
