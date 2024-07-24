# CustomCard Component

The CustomCard component is a flexible and reusable card component that can display various types of content, including text, images, SVGs, and even other React components.

## Props

| Prop | Type | Description |
|------|------|-------------|
| title | string | The title of the card (required) |
| description | string | The description text for the card (required) |
| media | object | An optional media object to display in the card |

### Media Object

The media object can have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| type | 'image' \| 'svg' \| 'component' | The type of media to display |
| content | string | The content or source of the media (for 'image' and 'svg' types) |
| component | React.Component | A React component to render (for 'component' type) |

## Usage

```jsx
import CustomCard from './CustomCard';

const MyComponent = () => (
  <CustomCard
    title="Example Card"
    description="This is an example of a custom card."
    media={{
      type: 'image',
      content: '/path/to/image.jpg'
    }}
  />
);