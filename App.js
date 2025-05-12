const { motion } = window['framer-motion'];
const { useState } = React;

function Section({ id, title, children }) {
  return (
    <motion.section id={id} className="block"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>{title}</h2>
      {children}
    </motion.section>
  );
}

function App() {
  return (
    <div className="container">
      <Section id="about" title="About Me">
        <p>
          Hi, I'm <strong>Akshay Kumar Midinti</strong> — a passionate Data Science and Computer Science professional
          with experience in Python, machine learning, and building innovative solutions.
        </p>
        <a href="resume.pdf" download className="resume-btn">Download My Resume</a>
      </Section>

      <Section id="skills" title="Skills">
        <ul>
          <li><strong>Programming:</strong> Python, Java, HTML, CSS, SQL</li>
          <li><strong>Data Science:</strong> Machine Learning, Data Analysis</li>
          <li><strong>Tools:</strong> TensorFlow, Streamlit</li>
        </ul>
      </Section>

      <Section id="projects" title="Projects">
        <div className="projects">
          <div className="card">
            <h3>Gesture Interpreter</h3>
            <p>Real-time sign language translator using OpenCV + Python.</p>
            <a href="#">GitHub Repo</a>
          </div>
          <div className="card">
            <h3>Image Classifier</h3>
            <p>Built with MobileNetV2 and Streamlit UI. Classifies images efficiently.</p>
            <a href="#">Live Demo</a>
          </div>
        </div>
      </Section>

      <Section id="contact" title="Contact Me">
        <form name="contact" method="POST" data-netlify="true">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </Section>
    </div>
  );
}
