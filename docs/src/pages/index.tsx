import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
// @ts-ignore
import logo from "@site/static/img/bloum_logo.png";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="header">
      <div className="container">
        <img src={logo} alt={"Bloum logo"} />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div>
          <Link
            className="button button--primary button--lg"
            to="/docs/components"
          >
            See components 🎨
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - A web components library`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
    </Layout>
  );
}
