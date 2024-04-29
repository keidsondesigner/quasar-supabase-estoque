import useSupabase from 'src/boot/supabase';
import { v4 as uuidV4 } from 'uuid';
import useAuthUser from './UseAuthUser';

export default function UseApiSupabase() {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  const list = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('*');

    if (error) throw error;
    return data;
  };

  const getById = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id); // comparando se o campo id é igual ao campo passado;

    if (error) throw error;
    return data[0];
  };

  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form,
          user_id: user.value.id,
        },
      ]);

    if (error) throw error;
    return data;
  };

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({
        ...form,
      })
      .match({ id: form.id });

    if (error) throw error;
    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id });

    if (error) throw error;
    return data;
  };

  const getImgUrlPublic = async (fileName, storageName) => {
    const { data, error } = supabase.storage
      .from(storageName)
      .getPublicUrl(fileName);
    if (error) throw error;
    return data.publicUrl;
  };

  const uploadImg = async (file, storageName) => {
    const fileName = uuidV4();
    const { error } = await supabase.storage
      .from(storageName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    const imgUrlPublic = await getImgUrlPublic(fileName, storageName);
    if (error) throw error;
    return imgUrlPublic;
  };

  return {
    list,
    getById,
    post,
    update,
    remove,
    uploadImg,
  };
}
