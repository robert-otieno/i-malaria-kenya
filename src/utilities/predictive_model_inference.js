const tf = window.tf;
const tfdf = window.tfdf;

export const predictiveModelInference = async (relative_humidity, temperature, precipitation) => {
  // Load the model
  const model = await tfdf.loadTFDFModel("http://127.0.0.1:3000/tfdf_model/model.json");

  // Perform an inference
  const result = await model.executeAsync({
    precipitation: tf.tensor([precipitation]),
    relative_humidity: tf.tensor([relative_humidity]),
    temperature: tf.tensor([temperature]),
  });

  return result.dataSync()[1];
};
