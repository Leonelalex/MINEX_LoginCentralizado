import { API_SICM } from "../../constants/SICM";
import { authHeader, handleResponse } from "../../helpers/SICM";
import { v4 as uuidv4 } from "uuid";

function sendFiles(adjunto, imgs, name) {
  const formData = new FormData();
  adjunto = new File([adjunto], name + ".pdf");
  formData.append("oficio", adjunto);
  imgs.forEach((img, index) => {
    if (img.foto !== null) {
      const file = img.foto.file;
      const extension = file.name.split(".").pop();
      formData.append(
        `img${index}`,
        new File([file], `${name}-${index}.${extension}`)
      );
    }
  });
  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: formData,
  };

  return fetch(`${API_SICM.service}/files/albakeneth`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function sendAdjunto(adjunto, name) {
  const formData = new FormData();
  adjunto = new File([adjunto], name + ".pdf");
  formData.append("oficio", adjunto);
  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: formData,
  };

  return fetch(`${API_SICM.service}/files/albakeneth/docs`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function sendDocsAB(docs) {
  if(!docs || docs.length === 0) return [];

  const formData = new FormData();
  const fileNames = [];
  docs.forEach((doc) => {
    const uuid = uuidv4();
    const extension = doc.name.split(".").pop();
    const filename = `${uuid}.${extension}`;
    const file = new File([doc], filename);
    formData.append(filename, file);
    fileNames.push(filename);
  });

  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: formData,
  };

  return fetch(`${API_SICM.service}/files/albakeneth/docs`, requestOptions)
    .then(handleResponse)
    .then(() => fileNames);
}

function sendImagesAB(docs) {
  if(!docs || docs.length === 0) return [];

  const formData = new FormData();
  const fileNames = [];
  docs.forEach((doc) => {
    const uuid = uuidv4();
    const extension = doc.name.split(".").pop();
    const filename = `${uuid}.${extension}`;
    const file = new File([doc], filename);
    formData.append(uuid, file);
    fileNames.push(filename);
  });

  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: formData,
  };

  return fetch(`${API_SICM.service}/files/albakeneth/fotos`, requestOptions)
    .then(handleResponse)
    .then((data) => fileNames);
}

function sendDocsIS(docs) {
  if(!docs || docs.length === 0) return [];

  const formData = new FormData();
  const fileNames = [];
  docs.forEach((doc) => {
    const uuid = uuidv4();
    const extension = doc.name.split(".").pop();
    const filename = `${uuid}.${extension}`;
    const file = new File([doc], filename);
    formData.append(filename, file);
    fileNames.push(filename);
  });

  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: formData,
  };

  return fetch(`${API_SICM.service}/files/isabelclaudina/docs`, requestOptions)
    .then(handleResponse)
    .then(() => fileNames);
}

function sendImagesIS(docs) {
  if(!docs || docs.length === 0) return [];

  const formData = new FormData();
  const fileNames = [];
  docs.forEach((doc) => {
    const uuid = uuidv4();
    const extension = doc.name.split(".").pop();
    const filename = `${uuid}.${extension}`;
    const file = new File([doc], filename);
    formData.append(uuid, file);
    fileNames.push(filename);
  });

  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: formData,
  };

  return fetch(`${API_SICM.service}/files/isabelclaudina/fotos`, requestOptions)
    .then(handleResponse)
    .then(() => fileNames);
}

function sendImagesCreateAB(imgs, name) {
  const formData = new FormData();
  const fileNames = [];
  imgs.forEach((img, index) => {
    if (img[name] !== null) {
      const file = img[name].file;
      const extension = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${extension}`;
      formData.append(`img${index}`, new File([file], fileName));
      fileNames.push(fileName);
    }
  });
  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      sistemId: API_SICM.system,
    },
    body: formData,
  };

  return fetch(`${API_SICM.service}/files/albakeneth/fotos`, requestOptions)
    .then(handleResponse)
    .then(() => fileNames);
}

export const fileService = {
  sendFiles,
  sendDocsAB,
  sendImagesAB,
  sendDocsIS,
  sendImagesIS,
  sendAdjunto,
  sendImagesCreateAB
};
