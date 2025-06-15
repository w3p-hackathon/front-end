"use client";

import { motion } from "motion/react";
import type { NextPage } from "next";
import {
  HiOutlineArrowNarrowUp,
  HiOutlineBeaker,
  HiOutlineBriefcase,
  HiOutlineCube,
  HiOutlineHand,
  HiOutlineShieldCheck,
} from "react-icons/hi";

const sectionCard = "rounded-xl border border-gray-700 bg-[#181a2b] shadow-md p-8 mb-8";
const sectionTitle = "text-2xl font-semibold mb-4 text-gray-100 flex items-center gap-3";
const sectionText = "text-base text-gray-200";
const sectionList = "list-disc list-inside text-gray-200";

const Home: NextPage = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center text-gray-100">
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mt-16 mb-8"
      >
        <h1 className="text-5xl font-extrabold mb-2 text-gray-100">SNPools</h1>
        <h2 className="text-xl font-medium mb-4 text-gray-300">Decentralized Marketplace for Encrypted Genetic Data</h2>
        <p className="max-w-2xl text-center text-lg text-gray-300">
          SNPools is a secure, privacy-first platform for sharing and monetizing encrypted genetic data, enabling
          permissioned computation and research while preserving user privacy.
        </p>
        <motion.img
          src="https://pbs.twimg.com/media/DLJyglKW4AA4i1B?format=jpg&name=900x900"
          alt="DNA Illustration"
          className="rounded-xl mt-8 shadow-lg border-2 border-gray-700 w-56 h-56 object-cover"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </motion.header>

      <section className={`w-full max-w-3xl ${sectionCard}`}>
        <motion.h3
          className={sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-indigo-300">
            <HiOutlineBeaker size={32} />
          </span>{" "}
          Description (TL;DR)
        </motion.h3>
        <motion.p
          className={sectionText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          SNPools is a decentralized, privacy-focused marketplace for encrypted genetic data, enabling secure,
          permissioned computation and data monetization using advanced cryptography.
        </motion.p>
      </section>

      <section className={`w-full max-w-3xl ${sectionCard}`}>
        <motion.h3
          className={sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-indigo-300">
            <HiOutlineHand size={32} />
          </span>{" "}
          Problem
        </motion.h3>
        <motion.p
          className={sectionText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Centralized genetic data platforms often misuse or sell user data without consent, compromising privacy and
          failing to fairly compensate data owners.
        </motion.p>
      </section>

      <section className={`w-full max-w-3xl ${sectionCard}`}>
        <motion.h3
          className={sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-green-300">
            <HiOutlineShieldCheck size={32} />
          </span>{" "}
          Solution
        </motion.h3>
        <motion.p
          className={sectionText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          SNPools encrypts genetic data using Fully Homomorphic Encryption (FHE) and Zero-Knowledge (ZK) proofs,
          allowing computations and research without exposing raw data. Users retain full control and can monetize their
          data securely.
        </motion.p>
      </section>

      <section className={`w-full max-w-3xl ${sectionCard}`}>
        <motion.h3
          className={sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-indigo-300">
            <HiOutlineCube size={32} />
          </span>{" "}
          Technology Stack
        </motion.h3>
        <motion.ul
          className={sectionList}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <li>Scaffold-ETH 2 (Next.js, RainbowKit, Wagmi, Typescript)</li>
          <li>Enclave</li>
          <li>Nillion</li>
          <li>Noir</li>
          <li>Fully Homomorphic Encryption (FHE)</li>
          <li>Zero-Knowledge Proofs (ZK)</li>
        </motion.ul>
      </section>

      <section className={`w-full max-w-3xl ${sectionCard}`}>
        <motion.h3
          className={sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-green-300">
            <HiOutlineShieldCheck size={32} />
          </span>{" "}
          Privacy Impact
        </motion.h3>
        <motion.p
          className={sectionText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          All genetic data is fully encrypted and never leaves user control. Computations are performed on encrypted
          data, ensuring privacy and self-sovereignty. No third party can access raw genetic information.
        </motion.p>
      </section>

      <section className={`w-full max-w-3xl ${sectionCard}`}>
        <motion.h3
          className={sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-indigo-300">
            <HiOutlineHand size={32} />
          </span>{" "}
          Real-World Use Cases
        </motion.h3>
        <motion.ul
          className={sectionList}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <li>Individuals monetizing their genetic data for research or pharma, with full privacy.</li>
          <li>Researchers training models on encrypted datasets without risking data leaks.</li>
          <li>Privacy-preserving health analytics and ancestry services.</li>
        </motion.ul>
      </section>

      <section className={`w-full max-w-3xl ${sectionCard}`}>
        <motion.h3
          className={sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-indigo-300">
            <HiOutlineBriefcase size={32} />
          </span>{" "}
          Business Logic
        </motion.h3>
        <motion.p
          className={sectionText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Users earn rewards or payments when their encrypted data is used for computation. The platform takes a small
          fee per transaction, ensuring sustainability while maximizing user profit and privacy.
        </motion.p>
      </section>

      <section className={`w-full max-w-3xl ${sectionCard}`}>
        <motion.h3
          className={sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-indigo-300">
            <HiOutlineArrowNarrowUp size={32} />
          </span>{" "}
          What&#39;s Next
        </motion.h3>
        <motion.p
          className={sectionText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Future plans include exploring shared genetic ownership, family-based permissions, and cross-chain
          interoperability. We aim to expand privacy tools and support new data types and computation models.
        </motion.p>
      </section>

      <footer className="mt-12 mb-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} SNPools. All rights reserved.
      </footer>
    </main>
  );
};

export default Home;
