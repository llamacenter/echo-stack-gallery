
import Layout from "@/components/Layout";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Services from "@/components/sections/Services";
import Articles from "@/components/sections/Articles";
import Contact from "@/components/sections/Contact";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Products />
      <Services />
      <Articles />
      <Contact />
    </Layout>
  );
};

export default Index;
