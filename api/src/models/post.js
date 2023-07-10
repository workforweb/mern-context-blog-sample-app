import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: false,
  }
);

// Duplicate the ID field.
postSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

postSchema.pre('save', async function (next) {
  const post = this;
  if (post.isModified('title')) {
    post.slug = await Sluggify(post.title);
  }

  next();
});

postSchema.pre('updateOne', async function (next) {
  const post = this;
  if (post.getUpdate().title !== undefined) {
    post.slug = await Sluggify(post.title);
    return next();
  } else {
    return next();
  }
});

const Post = mongoose.model('Post', postSchema);

export default Post;

async function Sluggify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .trim();
}

//function slugify(str) {
//  str = str.replace(/^\s+|\s+$/g, '') // trim
//  str = str.toLowerCase()
//
//  // remove accents, swap ñ for n, etc
//  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
//  var to = 'aaaaeeeeiiiioooouuuunc------'
//  for (var i = 0, l = from.length; i < l; i++) {
//    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
//  }
//
//  str = str
//    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
//    .replace(/\s+/g, '-') // collapse whitespace and replace by -
//    .replace(/-+/g, '-') // collapse dashes
//
//  return str
//}




