import React from "react";
import { ListGroup } from "react-bootstrap";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div id="About">
        <h1>Here, About page.</h1>
        <div className="mt-5">
          `Ruby on Rails` × `Next.js`で作成したチャットアプリです。<br />
          ルーム機能を実装し、複数のユーザーが同じルームに入室し、チャットできるようにしました。<br />
          <br />
          `Ruby on Rails`はAPIモードを使用し、`Next.js`は`TypeScript`で開発しました。<br />
          転職先の企業で`Ruby on Rails` × `Next.js`を使用するので、その学習用です。<br />
          <br />
          以下の技術を使用しています。
          <ListGroup className="mt-3">
            <ListGroup.Item>
              Next.js
              <ul className="my-3">
                <li>React</li>
                <li>TypeScript</li>
                <li>Bootstrap</li>
              </ul>
            </ListGroup.Item>
            <ListGroup.Item>
              Ruby
              <ul className="my-3">
                <li>Ruby on Rails</li>
                <li>API mode</li>
                <li>Action Cable (WebSocket)</li>
              </ul>
            </ListGroup.Item>
            <ListGroup.Item>
              Docker
            </ListGroup.Item>
            <ListGroup.Item>
              GitHub
              <ul className="my-3">
                <li>Repository</li>
                <li>GitHub Actions</li>
              </ul>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </Layout>
  );
};
