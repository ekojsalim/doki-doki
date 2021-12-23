import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { useState } from "react";

const methodAndLabels = [
  {
    method: "target",
    label: "Mean",
  },
  {
    method: "noisy",
    label: "Noisy",
  },
  {
    method: "nlmeans",
    label: "NLMeans",
  },
  {
    method: "guided",
    label: "Guided Filter",
  },
  {
    method: "bilateral",
    label: "Bilateral Filter",
  },
  {
    method: "uformer-baseline",
    label: "Uformer Baseline",
  },
  {
    method: "uformer-tuned",
    label: "Uformer Tuned",
  },
  {
    method: "restormer-baseline",
    label: "Restormer Baseline",
  },
  {
    method: "restormer-tuned",
    label: "Restormer Tuned",
  },
];

const typeAndLabels = [
  {
    type: "min",
    label: "Minimum",
  },
  {
    type: "average",
    label: "Average",
  },
  {
    type: "max",
    label: "Maximum",
  },
];

const tableMap = {
  min: [
    {
      method: "Baseline",
      psnr: "32.33",
      ssim: "0.829",
    },
    {
      method: "Bilateral",
      psnr: "32.40",
      ssim: "0.884",
    },
    {
      method: "NLMeans",
      psnr: "32.76",
      ssim: "0.888",
    },
    {
      method: "Guided",
      psnr: "32.92",
      ssim: "0.898",
    },
    {
      method: "Uformer Baseline",
      psnr: "32.11",
      ssim: "0.916",
    },
    {
      method: "Uformer Tuned",
      psnr: "33.61",
      ssim: "0.922",
    },
    {
      method: "Restormer Baseline",
      psnr: "32.73",
      ssim: "0.919",
    },
    {
      method: "Restormer Tuned",
      psnr: "33.57",
      ssim: "0.921",
    },
  ],
  average: [
    {
      method: "Baseline",
      psnr: "36.68",
      ssim: "-",
    },
    {
      method: "Bilateral",
      psnr: "35.90",
      ssim: "-",
    },
    {
      method: "NLMeans",
      psnr: "35.96",
      ssim: "-",
    },
    {
      method: "Guided",
      psnr: "37.19",
      ssim: "-",
    },
    {
      method: "Uformer Baseline",
      psnr: "38.08",
      ssim: "-",
    },
    {
      method: "Uformer Tuned",
      psnr: "37.91",
      ssim: "-",
    },
    {
      method: "Restormer Baseline",
      psnr: "38.02",
      ssim: "-",
    },
    {
      method: "Restormer Tuned",
      psnr: "38.16",
      ssim: "-",
    },
  ],
  max: [
    {
      method: "Baseline",
      psnr: "41.00",
      ssim: "0.970",
    },
    {
      method: "Bilateral",
      psnr: "41.84",
      ssim: "0.985",
    },
    {
      method: "NLMeans",
      psnr: "42.03",
      ssim: "0.982",
    },
    {
      method: "Guided",
      psnr: "42.84",
      ssim: "0.983",
    },
    {
      method: "Uformer Baseline",
      psnr: "43.34",
      ssim: "0.984",
    },
    {
      method: "Uformer Tuned",
      psnr: "44.58",
      ssim: "0.989",
    },
    {
      method: "Restormer Baseline",
      psnr: "43.49",
      ssim: "0.984",
    },
    {
      method: "Restormer Tuned",
      psnr: "44.49",
      ssim: "0.989",
    },
  ],
};

const Home: NextPage = () => {
  const [imageType, setImageType] = useState("average");
  const [firstImage, setFirstImage] = useState("noisy");
  const [secondImage, setSecondImage] = useState("uformer-tuned");

  const firstImagePath = `/pengcit/comparison/${imageType}_${firstImage}.jpg`;
  const secondImagePath = `/pengcit/comparison/${imageType}_${secondImage}.jpg`;

  return (
    <div className={styles.container}>
      <Head>
        <title>Doki-Doki Image Denoising</title>
        <meta
          name="description"
          content="Image Denoising Comparison using various conventional and deep learning methods"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <aside className="absolute top-0 left-0 h-screen">
        <div className="h-full flex flex-col justify-center px-8">
          <select
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
          >
            {typeAndLabels.map(({ type, label }) => (
              <option value={type} key={type}>{label}</option>
            ))}
          </select>
          <table className="table-auto border border-black border-collapse mt-4">
            {/* <caption>Council budget (in £) 2018</caption> */}
            <thead>
              <tr>
                <th scope="col" className="border border-black">
                  Method
                </th>
                <th scope="col" className="border border-black">
                  PSNR
                </th>
                <th scope="col" className="border border-black">
                  SSIM
                </th>
              </tr>
            </thead>
            <tbody>
              {tableMap[imageType].map(({ method, psnr, ssim }) => (
                <tr className="border border-black" key={method}>
                  <th scope="row" className="border border-black px-2">
                    {method}
                  </th>
                  <td className="border border-black px-2">{psnr}</td>
                  <td className="border border-black px-2">{ssim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>

      <main className={styles.main}>
        <h1 className={styles.title}>Doki-Doki Denoising</h1>

        <div className="flex gap-x-4 mb-4">
          <select
            value={firstImage}
            onChange={(e) => setFirstImage(e.target.value)}
          >
            {methodAndLabels.map(({ method, label }) => (
              <option value={method} key={method}>{label}</option>
            ))}
          </select>

          <select
            value={secondImage}
            onChange={(e) => setSecondImage(e.target.value)}
          >
            {methodAndLabels.map(({ method, label }) => (
              <option value={method} key={method}>{label}</option>
            ))}
          </select>
        </div>

        {/* <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p> */}

        <div className="">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage src={firstImagePath} alt={firstImage} />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={secondImagePath}
                alt={secondImage}
              />
            }
            style={{
              height: "80vh",
            }}
            // className="height-[80vh]"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
