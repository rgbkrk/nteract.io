// @flow
import Layout from "../components/layout/layout";
import {
  ContentSection,
  ContentSectionPane
} from "../components/content-section/content-section";

import React from "react";

import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../components/page-header/page-header";

type Output = any;

type CellProps = {
  executionCount?: "*" | number | null,
  source: string,
  outputs: Array<Output>
};

const Cell = (
  { executionCount, source, outputs }: CellProps = {
    executionCount: null,
    source: "",
    outputs: []
  }
) => {
  return (
    <div className="cell">
      <div className="input-container">
        <div className="prompt">[{executionCount ? executionCount : " "}]</div>
        <pre className="input">{source}</pre>
      </div>
      <div>
        <div className="outputs">
          {outputs.map(output => {
            switch (output.mimetype) {
              case "text/plain":
                return <pre>{output.data}</pre>;
              case "text/html":
                return <pre>html here</pre>;
              case "application/vdom.v1+json":
                const { tagName, attributes, children } = output.data;
                return React.createElement(tagName, attributes, children);
              default:
                return null;
            }
          })}
        </div>
      </div>
      <style jsx global>{``}</style>
      <style jsx>{`
        pre {
          /* There are currently global styles that are overwriting <pre> to
          have terrible defaults, complete with their own !important */
          padding: 0px !important;
          box-shadow: none;
        }

        div {
          /* well this is neat, I can set the css variable inline */
          --prompt-width: 50px;
        }

        .cell {
          /* only for hover though */
          box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.12),
            -3px -3px 9px rgba(0, 0, 0, 0.12);

          position: relative;
          background: var(--cell-bg);
          transition: all 0.1s ease-in-out;
        }

        .input-container {
          display: flex;
          flex-direction: row;
          padding: 0px;
        }

        .input {
          flex: 1 1 auto;
          overflow: auto;
          font-family: "Source Code Pro", monospace;
          letter-spacing: 0.3px;
          word-spacing: 1px;
          background-color: rgb(250, 250, 250);
          font-size: 14px;
          line-height: 20px;

          position: relative;
          top: 0px;
          margin: 0 auto;
          padding: 10px 0px 10px 10px !important;
        }

        .outputs {
          padding: 10px 10px 10px calc(var(--prompt-width) + 10px);
        }

        .outputs pre {
          white-space: pre-wrap;
          font-size: 14px;
          word-wrap: break-word;
        }

        .prompt {
          font-family: monospace;
          background-color: rgb(226, 223, 227);
          color: rgb(140, 138, 142);
          width: var(--prompt-width);
          padding: 9px 0;
          text-align: center;
          flex: 0 0 auto;

          font-size: 14px;
          line-height: 20px;

          margin: 0 auto;
          padding: 10px 0px 10px 0px !important;
        }
      `}</style>
    </div>
  );
};

const SectionOne = () => (
  <ContentSection>
    <ContentSectionPane layout="left">
      <h3>Foundations</h3>
      <p>
        nteract is built on top of a suite of protocols and file formats from
        the jupyter project.
      </p>
      <Cell
        source="import this"
        outputs={[
          {
            mimetype: "text/plain",
            data: `The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!`
          }
        ]}
      />
      <hr />
      <Cell
        source={`from vdom import h1\nh1("it works!")`}
        outputs={[
          {
            mimetype: "application/vdom.v1+json",
            data: {
              tagName: "h1",
              children: "it works!",
              attributes: {}
            }
          }
        ]}
      />
    </ContentSectionPane>
  </ContentSection>
);

export default class AboutPage extends React.Component<OSProps, void> {
  render() {
    let themeColor = "#333333";

    return (
      <Layout pageTitle=": We're people, not software!" themeColor={themeColor}>
        <PageHeader themeColor={themeColor}>
          <PageHeaderLeft>
            <h1>Architecture</h1>
          </PageHeaderLeft>
        </PageHeader>
        <SectionOne />
      </Layout>
    );
  }
}
