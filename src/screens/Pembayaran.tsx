import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import TotalHarga from '../components/pemesanan/TotalHarga';
import BottomSpace from '../components/BottomSpace';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import ConfirmButton from '../components/pemesanan/ConfirmButton';
import DetailPembayaran from '../components/pembayaran/DetailPembayaran';
import MemberPicker from '../components/pembayaran/MemberPicker';
import UploadButton from '../components/pembayaran/UploadButton';

const Pembayaran = () => {
  const [selectedValue, setSelectedValue] = React.useState('2');
  const [uploadedFiles, setUploadedFiles] = React.useState(null);

  const onValueChange = (itemValue: string) => {
    setSelectedValue(itemValue);
  };

  const uploadFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      const uploadedFileUrl = res.uri;
      const fileType = res.type;

      console.log({
        uploadedFileUrl,
        fileType,
      });

      // Read the file data
      const fileData = await RNFS.readFile(uploadedFileUrl, 'base64');

      setUploadedFiles({
        data: `data:${fileType};base64,${fileData}`, // Save the file data as base64 string
        type: fileType,
      });

      console.log(uploadedFiles);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.info(err);
      } else {
        throw err;
      }
    }
  };

  const handleSubmit = () => {
    console.log('Berhasil');
  };

  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Pembayaran" marginBottom={20} />
        <TotalHarga harga={60000} label="Jumlah yang harus dibayarkan" />
        <DetailPembayaran />
        <MemberPicker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        />
        <UploadButton onPress={uploadFile} uploadedFiles={uploadedFiles} />
        <ConfirmButton title="Konfirmasi Pembayaran" onPress={handleSubmit} />
        <BottomSpace marginBottom={40} />
      </RootContainer>
    </>
  );
};

export default Pembayaran;
