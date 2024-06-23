const express = require('express')
const placeholderPhotos = require('../placeholder.photos')

/**
 *
 * @param {*} sessionDurations
 * @returns {Array<object>} array of object containing details for each photo
 */
const createDevSession = (sessionDurations) => {
  const photos = []
  for (let i = 0; i < sessionDurations.length; i++) {
    photos.push({
      duration: sessionDurations[i],
      url: placeholderPhotos[i % placeholderPhotos.length],
    })
  }
  return photos
}

module.exports = {
  createDevSession,
}
