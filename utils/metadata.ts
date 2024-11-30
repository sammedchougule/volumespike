// src/utils/metadata.ts

export const defaultMetadata = {
    title: 'VolumeSpike | Stock Market Analysis',
    description: 'Track stocks, indices, and financial news at VolumeSpike.',
    metadataBase: new URL('https://www.volumespike.in'), // Set base URL for resolving relative paths
    openGraph: {
      title: 'VolumeSpike | Stock Market Analysis',
      description: 'Stay updated with stock market trends and insights.',
      url: 'https://www.volumespike.in',
      images: [
        {
          url: '/images/volumespike.jpg', // Path to the image inside the public folder
          width: 200,
          height: 200,
          alt: 'VolumeSpike stock market analysis',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'VolumeSpike | Stock Market Analysis',
      description: 'Stay updated with stock market trends and insights.',
      images: ['/images/volumespike.jpg'], // Path to the Twitter card image
    },
  };
