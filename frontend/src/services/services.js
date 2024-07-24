
import TechnoEconomicChart from '../visualizations/TechnoEconomicChart/TechnoEconomicChart';
import dataInsightsImage from '../assets/images/stock_image_data.jpg';

/**
 * Array of service objects representing the main services offered.
 * @type {Array<Object>}
 */
export const services = [
  {
    id: 1,
    title: "Techno-Economic Analysis",
    description: "Leverage our AI-powered TEA to make informed decisions about your technology investments.",
    media: {
      type: 'component',
      component: TechnoEconomicChart
    },
    linkTo: '/services#techno-economic-analysis',
  },
  {
    id: 2,
    title: "Strategic Consulting",
    description: "Get expert guidance on navigating the complex landscape of emerging technologies.",
    media: {
      type: 'svg',
      content: '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>'
    },
    linkTo: '/services#strategic-consulting'
  },
  {
    id: 3,
    title: "Data-Driven Insights",
    description: "Harness the power of big data to drive innovation and growth in your organization.",
    media: {
      type: 'image',
      content: dataInsightsImage
    },
    linkTo: '/services#data-driven-insights'
  }
];
