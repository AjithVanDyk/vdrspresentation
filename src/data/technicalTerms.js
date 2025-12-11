// Technical Terms Dictionary
// Simple, real-life explanations suitable for 10th-grade students

export const technicalTerms = {
  // AI & Machine Learning
  'RAG': {
    term: 'RAG (Retrieval-Augmented Generation)',
    explanation: 'Think of RAG like a smart assistant that has access to a huge library. When you ask a question, it first searches through thousands of documents to find the most relevant information, then uses that information to give you an accurate answer. It\'s like having a librarian who can instantly find the right book and summarize it for you.'
  },
  'Machine Learning': {
    term: 'Machine Learning',
    explanation: 'Machine learning is like teaching a computer to recognize patterns by showing it many examples. Just like you learn to recognize a dog after seeing many dogs, a computer learns to make predictions or decisions after seeing many examples. For example, it can learn to predict travel costs by looking at thousands of past travel expenses.'
  },
  'Vector Database': {
    term: 'Vector Database',
    explanation: 'A vector database stores information in a special way that helps computers understand meaning, not just words. Imagine if you could store books by their topics and themes, not just by their titles. When you search, it finds books with similar ideas, even if they use different words. This is how AI systems quickly find relevant information from thousands of documents.'
  },
  'ChromaDB': {
    term: 'ChromaDB',
    explanation: 'ChromaDB is a special type of database designed to store and search through "vector" representations of text. Think of it as a super-smart filing cabinet that can find documents based on what they mean, not just keywords. It\'s like having a filing system that groups similar ideas together, making it incredibly fast to find relevant information.'
  },
  
  // Backend & APIs
  'API': {
    term: 'API (Application Programming Interface)',
    explanation: 'An API is like a waiter in a restaurant. You (the customer) don\'t go into the kitchen to get your food. Instead, you tell the waiter what you want, and they bring it to you. Similarly, an API lets different computer programs talk to each other and share information without needing to know how each other works internally.'
  },
  'Flask': {
    term: 'Flask',
    explanation: 'Flask is a lightweight web framework for Python. Think of it as a toolkit that helps you build web applications quickly. It\'s like having pre-made building blocks for creating websites and web services, so you don\'t have to build everything from scratch.'
  },
  'SQL Server': {
    term: 'SQL Server',
    explanation: 'SQL Server is a database system that stores and organizes data in tables, like a digital filing cabinet. It\'s designed to handle large amounts of information and allows you to quickly find, update, or organize data. Think of it as a super-organized library where you can instantly find any book (data) you need.'
  },
  'Backend': {
    term: 'Backend',
    explanation: 'The backend is like the kitchen of a restaurant - customers don\'t see it, but it\'s where all the work happens. In software, the backend handles data storage, processing, and business logic. It\'s the part of a website or app that works behind the scenes to make everything function.'
  },
  
  // Frontend
  'React': {
    term: 'React',
    explanation: 'React is a JavaScript library for building user interfaces. Think of it like LEGO blocks for websites - you build small, reusable pieces (components) and combine them to create complex web pages. It makes websites fast and interactive, like having a smart assistant that updates the page instantly when something changes.'
  },
  'PWA': {
    term: 'PWA (Progressive Web App)',
    explanation: 'A PWA is a website that works like a mobile app. You can install it on your phone, it works offline, and it feels just like a native app. It\'s like having the best of both worlds - the convenience of a website (no app store needed) with the performance of a mobile app.'
  },
  
  // Cloud & Infrastructure
  'Azure': {
    term: 'Azure',
    explanation: 'Azure is Microsoft\'s cloud computing platform. Think of it as renting computer power, storage, and services over the internet instead of buying and maintaining your own servers. It\'s like renting a warehouse instead of buying one - you pay for what you use and can scale up or down as needed.'
  },
  'Azure Blob Storage': {
    term: 'Azure Blob Storage',
    explanation: 'Azure Blob Storage is like a massive online storage locker for files. You can store any type of file (images, documents, videos) and access them from anywhere in the world. It\'s designed to handle huge amounts of data reliably and securely, like a digital warehouse for your files.'
  },
  'CI/CD': {
    term: 'CI/CD (Continuous Integration/Continuous Deployment)',
    explanation: 'CI/CD is like having an automated assembly line for software. Every time a developer makes a change, the system automatically tests it and, if everything works, deploys it to users. It\'s like having a robot that checks your homework, fixes mistakes, and turns it in - all automatically.'
  },
  
  // Data Processing
  'PDF Processing': {
    term: 'PDF Processing',
    explanation: 'PDF processing involves extracting text, images, and data from PDF files automatically. Instead of manually reading and copying information from documents, a computer program reads the PDF and pulls out the important information. It\'s like having a robot assistant that can read documents and extract the key details instantly.'
  },
  'Data Extraction': {
    term: 'Data Extraction',
    explanation: 'Data extraction is the process of automatically pulling specific information from documents or files. Instead of manually copying data, a program scans through files and collects the needed information. It\'s like having a smart assistant that can read through hundreds of documents and create a summary with all the important details.'
  },
  'Pipeline': {
    term: 'Pipeline',
    explanation: 'A pipeline is a series of automated steps that process data from start to finish. Think of it like an assembly line in a factory - raw materials (data) go in at one end, and each station (step) does something to it until a finished product comes out. Each step depends on the previous one, creating an efficient workflow.'
  },
  
  // Security
  'OTP': {
    term: 'OTP (One-Time Password)',
    explanation: 'An OTP is a temporary password that can only be used once. It\'s like a single-use ticket to a concert - once you use it, it\'s no longer valid. This makes accounts more secure because even if someone intercepts the password, they can\'t use it again.'
  },
  'JWT': {
    term: 'JWT (JSON Web Token)',
    explanation: 'A JWT is like a digital ID card that proves who you are without revealing your password. When you log in, the system gives you this token, and you use it to access protected areas. It\'s like a temporary badge that expires after a certain time, keeping your account secure.'
  },
  'SHA-256': {
    term: 'SHA-256 Hashing',
    explanation: 'SHA-256 is a cryptographic function that converts data into a fixed-size string of characters. Think of it like a one-way blender - you can put data in and get a unique "fingerprint" out, but you can\'t reverse it to get the original data back. It\'s used to securely store passwords and verify data integrity.'
  },
  
  // General Tech
  'Algorithm': {
    term: 'Algorithm',
    explanation: 'An algorithm is a step-by-step procedure for solving a problem or completing a task. It\'s like a recipe - you follow specific steps in order to get the desired result. In programming, algorithms help computers solve problems efficiently, like finding the shortest route or sorting a list of names.'
  },
  'Optimization': {
    term: 'Optimization',
    explanation: 'Optimization means making something work as efficiently as possible. It\'s like finding the fastest route to work or organizing your room so you can find things quickly. In programming, optimization makes code run faster, use less memory, or process data more efficiently.'
  },
  'Scalability': {
    term: 'Scalability',
    explanation: 'Scalability is the ability of a system to handle growth - more users, more data, or more requests. Think of it like a restaurant that can serve 10 customers or 1000 customers without breaking down. A scalable system can grow smoothly without needing a complete redesign.'
  }
};

// Helper function to find terms in text
export const findTechnicalTerms = (text) => {
  const foundTerms = [];
  const lowerText = text.toLowerCase();
  
  Object.keys(technicalTerms).forEach(key => {
    const term = technicalTerms[key];
    const searchTerms = [
      key.toLowerCase(),
      term.term.toLowerCase(),
      ...term.term.split(' ').map(w => w.toLowerCase())
    ];
    
    searchTerms.forEach(searchTerm => {
      if (lowerText.includes(searchTerm) && searchTerm.length > 2) {
        foundTerms.push({
          term: key,
          ...term,
          position: lowerText.indexOf(searchTerm)
        });
      }
    });
  });
  
  return foundTerms;
};


