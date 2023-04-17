import {
  defineDocumentType,
  makeSource,
  FieldDefs,
} from "contentlayer/source-files";

/**
 * Standard content record fields
 */
const basicContentFields: FieldDefs = {
  title: {
    type: "string",
    description: "The primary title of the post",
    required: true,
  },
  description: {
    type: "string",
    description:
      "Brief description of the content (also used in the SEO metadata)",
    required: false,
  },
  keywords: {
    type: "list",
    of: { type: "string" },
    description: "List of keywords for the content",
    required: false,
  },

  canonical: {
    type: "string",
    description: "Canonical url of the content",
    required: false,
  },

  // todo: enable setting custom slugs via the metadata
  // slug: {
  //   type: "string",
  //   description: "Custom URL slug for the content",
  //   required: false,
  // },

  // todo: enable setting a featured flag via the metadata
  // featured: {
  //   type: "boolean",
  //   description: "Whether or not this content is featured",
  //   required: false,
  // },

  image: {
    type: "string",
    description:
      "The primary image of the content (also used in the SEO metadata)",
    required: false,
  },
};

/**
 * Content record schema for Developer Guides
 */
export const DeveloperGuide = defineDocumentType(() => ({
  name: "DeveloperGuide",
  filePathPattern: `developers/guides/**/*.md`,
  fields: {
    // use the standard content fields
    ...basicContentFields,

    // define custom fields for this specific content...
    // category: {
    //   type: "string",
    //   description: "",
    //   required: false,
    // },
  },
}));

/**
 * Content record schema for the Course metadata file
 *
 * File: `courses/{course-name}/metadata.json`
 */
export const CourseMetadata = defineDocumentType(() => ({
  name: "CourseMetadata",
  filePathPattern: `developers/courses/**/metadata.json`,
  fields: {
    // use the standard content fields
    ...basicContentFields,

    // define custom fields for this specific content...
    structure: {
      type: "list",
      of: { type: "json" },
      description: "",
      required: false,
    },
  },
}));

/**
 * Content record schema a single Course Lesson
 */
export const CourseLesson = defineDocumentType(() => ({
  name: "CourseLesson",
  filePathPattern: `developers/courses/**/content/*.md`,
  fields: {
    // use the standard content fields
    ...basicContentFields,

    // define custom fields for this specific content...
    objectives: {
      type: "list",
      of: { type: "string" },
      description: "List of objectives for the Course Lesson",
      required: false,
    },
  },
}));

/**
 * Simple record type to enable ignoring files in the contentlayer checks
 * Note: This should be used sparingly (and normally only for readme files)
 *
 * Auto ignored documents:
 *  - readme.md
 *  - README.md
 */
export const IgnoredDoc = defineDocumentType(() => ({
  name: "IgnoredDoc",
  filePathPattern: `**/+(README|readme).md`,
}));

/**
 * Export the contentlayer settings
 */
export default makeSource({
  // set the base content directories to search for content records
  contentDirPath: ".",
  contentDirInclude: [
    "docs/**",
    "developers/guides/**",
    "developers/courses/**",
    "developers/resources/**",
  ],

  // include the content record types to support
  documentTypes: [
    IgnoredDoc,

    // developer specific content
    DeveloperGuide,

    // course specific content record types
    CourseMetadata,
    CourseLesson,
  ],

  // settings to force fail on bad data schema
  onUnknownDocuments: "fail",
  onMissingOrIncompatibleData: "fail",
  onExtraFieldData: "fail",
});