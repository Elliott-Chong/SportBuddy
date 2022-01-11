import React from "react";

const About = () => {
  return (
    <div>
      <h1 id="sportbuddy" className='text-4xl mb-4'>What is this website about?</h1>
      <p>
        Ever wanted to play some sports but find that your friends are too busy?
        With <strong>SportBuddy</strong>, you can find Buddies to enjoy your
        favourite sports together! Just create a new posting with your desired
        Sport, and await other users to join the group. You can chat with them
        in the live chat section for more details. Visit the site now at{" "}
        <a href="https://SportBuddy-Elle.netlify.app!">
          https://SportBuddy-Elle.netlify.app!
        </a>
      </p>
      <h1 id="link-to-code">Link to Code</h1>
      <p>
        <a href="https://GitHub.com/Elliott-Chong/SportBuddy">
          https://GitHub.com/Elliott-Chong/SportBuddy
        </a>
      </p>
      <h1 id="submission-category">Submission Category</h1>
      <p>
        <strong>
          <em>Choose Your Own Adventure</em>
        </strong>
      </p>
      <h1 id="technologies-used">Technologies Used</h1>
      <p>
        This is my first serious full stack project using the{" "}
        <strong>MongoDB</strong>, <strong>React</strong>,{" "}
        <strong>Express</strong> and <strong>NodeJS</strong> (<em>MERN</em>)
        Stack. Featuring a custom authentication system using{" "}
        <strong>JSON Web Tokens</strong> for session management, and Google
        OAuth for SSO.{" "}
      </p>
      <h2 id="features">Features</h2>
      <ul>
        <li>
          <em>Custom</em> <strong>theme</strong> and <strong>design</strong>,
          layout preplanned in Inkscape, a vector based graphics editor.
        </li>
        <li>
          <em>Custom</em> CSS implemented using <strong>TailwindCSS</strong>, a
          utility based CSS framework.
        </li>
        <li>
          <em>Fully</em> <strong>responsive</strong> design for a better User
          Experience.
        </li>
        <li>
          <em>State management</em> involved React&#39;s{" "}
          <strong>useReducer</strong> hook and their <strong>Context</strong>{" "}
          <strong>API</strong>.
        </li>
        <li>
          <em>Live chat feature</em> uses <strong>WebSockets</strong>,
          implemented by the NodeJS package socket.io, allowing for full-duplex
          communication channels over a single TCP connection. This allows for
          all clients to receive socket messages at the same time and update
          thier state accordingly.
        </li>
        <li>
          <strong>Mongoose</strong>, a MongoDB wrapper, was used as a{" "}
          <em>Object Relational Wrapper</em> (ORM) to simplify the process of
          reading and writing to the database.
        </li>
      </ul>
    </div>
  );
};

export default About;
