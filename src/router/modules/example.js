import Layout from "@/views/layout";

export default {
  sort: 1,
  path: "/example",
  component: Layout,
  meta: {
    title: "example"
  },
  children: [
    {
      path: "index",
      component: () =>
        import(/* webpackChunkName:"example-index" */ "@/views/example/index"),
      name: "example-index",
      meta: { title: "index" }
    }
  ]
};
