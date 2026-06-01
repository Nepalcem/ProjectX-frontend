import type { FC } from "react";

const Intro: FC = () => {
  return (
    <section className="intro" aria-label="About Age of Battles">
      <div className="intro__text">
        <p>
          Welcome to the world of <strong>AgeOfBattles</strong>!
        </p>

        <p>Its is a browser-based medieval turn-based RPG MMO.</p>

        <p>
          At the moment, the game is being developed by a single developer
          (designer, architect, tester, support specialist, QA engineer, and
          DevOps), so new features will be added gradually.
        </p>

        <p>So why should you stay and play?</p>

        <ol>
          <li>
            I&apos;m building it as a{" "}
            <strong>PWA (Progressive Web Application)</strong>, which means you
            can access it from a desktop, laptop, or mobile device and enjoy the
            same experience everywhere.
          </li>
          <li>
            This also means you can play from anywhere in the world, even on
            your mobile device.
          </li>
          <li>
            All your data is saved, so you won&apos;t lose your progress.
          </li>
          <li>
            The game has a modern design (at least I hope so!).
          </li>
          <li>
            I have many plans for future features, including:
            <ul>
              <li>
                A unique resource gathering and crafting system;
              </li>
              <li>Special abilities that can be used in battle;</li>
              <li>
                A unique equipment leveling system, where low-tier items can be
                upgraded with new materials into more powerful equipment;
              </li>
              <li>
                The same equipment made from different-tier materials will have
                unique appearances on characters and races;
              </li>
              <li>Equipment enchanting;</li>
              <li>A jewelry system;</li>
              <li>
                Multiple resource-gathering activities for different aspects of
                gameplay;
              </li>
              <li>
                Dungeons to test player skills and earn valuable rewards;
              </li>
              <li>Clan systems, activities, and clan skills;</li>
              <li>
                A trading system to emulate a real-world economy;
              </li>
              <li>Magic spells (definitely not in 2026!);</li>
              <li>
                Language translations for international players;
              </li>
              <li>And much more!</li>
            </ul>
          </li>
          <li>
            Since the game is currently in <strong>pre-alpha</strong>, you can
            directly influence its development. Your ideas and suggestions may
            be implemented in future updates!
          </li>
        </ol>
      </div>
    </section>
  );
};

export default Intro;
