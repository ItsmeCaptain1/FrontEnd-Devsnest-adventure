import { useState } from "react";
const Meme = ({ meme, setMeme }) => {
  const [form, setForm] = useState({
    template_id: meme.id,
    username: "captain4700",
    password: "7296897875",
    boxes: [],
  });
  const generateMeme = () => {
    let url = `https://api.imgflip.com/caption_image?template_id=${form.template_id}&username=${form.username}&password=${form.password}`;
    form.boxes.map((box, index) => {
      url += `&boxes[${index}][text]=${box.text}`;
    });
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMeme({ ...meme, url: data.data.url }));
  };
  return (
    <div className="meme">
      <img src={meme.url} alt="" />
      <div>
        {[...Array(meme.box_count)].map((el, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Meme Caption ${idx + 1}`}
            onChange={(e) => {
              const newBoxes = form.boxes;
              newBoxes[idx] = { text: e.target.value };
              setForm({ ...form, boxes: newBoxes });
            }}
          />
        ))}
      </div>
      <div>
        <button onClick={generateMeme}>Generate Meme</button>
        <button onClick={() => setMeme(null)}>Choose Templates</button>
      </div>
    </div>
  );
};
export default Meme;