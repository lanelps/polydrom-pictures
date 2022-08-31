import React from "react";

export default {
  name: `job`,
  title: `Jobs`,
  type: `document`,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`
    },
    {
      name: `timeline`,
      title: `Timeline`,
      type: `string`
    },
    {
      name: `location`,
      title: `Location`,
      type: `string`
    },
    {
      name: `pay`,
      title: `Pay`,
      type: `string`
    },
    {
      name: `description`,
      title: `Description`,
      type: `text`
    },
    {
      name: `jobFile`,
      title: `PDF/ Full description`,
      type: `file`
    }
  ],
  preview: {
    select: {
      title: `title`,
      timeline: `timeline`,
      location: `location`,
      pay: `pay`
    },
    prepare: ({ title, timeline, location, pay }) => ({
      title,
      subtitle: `${timeline}; ${location}; ${pay}`,
      media: <span style={{ fontSize: `30px` }}>📄</span>
    })
  }
};
