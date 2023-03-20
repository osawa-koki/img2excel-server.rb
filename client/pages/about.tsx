import React from "react";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div id="About">
        <h1>Here, About page.</h1>
        <div className="mt-3">
          `Ruby on Rails`と`Next.js`で実装した画像をExcelに変換するアプリです。<br />
          特に意味はありません。<br />
          お遊びプログラムです。
        </div>
      </div>
    </Layout>
  );
};
