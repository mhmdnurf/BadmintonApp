import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  RefreshControl,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FlatContainer from '../components/FlatContainer';
import Header from '../components/Header';
import JadwalItem from '../components/jadwal/JadwalItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSpace from '../components/BottomSpace';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

interface Jadwal {
  navigation: any;
  route: any;
}

interface Lapangan {
  title: string;
  data: string[];
  bookedTimes: string[];
}

const Jadwal = ({route, navigation}: Jadwal) => {
  const {itemId} = route.params;
  const isFocused = useIsFocused();
  const [lapangan, setLapangan] = React.useState<Lapangan[]>([]);
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataLapangan, setDataLapangan] = React.useState({} as any);
  const [booked, setBooked] = React.useState([] as any);

  const fetchBooked = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const selectedDate = date.toISOString().split('T')[0];
      const query = await firestore()
        .collection('booking')
        .where('gor_uid', '==', itemId)
        .get();
      const bookedData = query.docs
        .map(doc => doc.data())
        .filter(data => data.tanggalPemesanan.split('T')[0] === selectedDate);
      setBooked(bookedData);
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setRefreshing(false);
    }
  }, [itemId, date]);

  const fetchJadwal = React.useCallback(async () => {
    try {
      setRefreshing(true);
      const query = await firestore().collection('gor').doc(itemId).get();
      const lapanganData = query.data();
      setDataLapangan({
        id: itemId,
        jumlahLapangan: lapanganData?.jumlahLapangan,
        namaGOR: lapanganData?.namaGOR,
        waktuBuka: `${lapanganData?.waktuBuka} - ${lapanganData?.waktuTutup}`,
        hargaLapangan: lapanganData?.hargaLapangan,
        booked: booked.map(
          (item: {lapangan: string; waktu: Array<string>}) => ({
            lapangan: parseInt(item.lapangan, 10),
            waktu: JSON.stringify(item.waktu),
          }),
        ),
      });
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setRefreshing(false);
    }
  }, [itemId, booked]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchBooked();
    }
  }, [fetchBooked, isFocused]);

  React.useEffect(() => {
    if (isFocused) {
      fetchJadwal();
    }
  }, [fetchJadwal, isFocused]);

  React.useEffect(() => {
    if (dataLapangan?.waktuBuka) {
      setRefreshing(false);
      const [startHour, endHour] = dataLapangan?.waktuBuka
        .split(' - ')
        .map((time: string) => parseInt(time.split('.')[0], 10));
      const waktu = Array.from({length: endHour - startHour + 1}, (_, i) => {
        const hour = startHour + i;
        return `${hour < 10 ? '0' + hour : hour}.00`;
      });
      setLapangan(
        Array.from({length: dataLapangan.jumlahLapangan}, (_, i) => {
          const booking = dataLapangan.booked.find(
            (b: {lapangan: number}) => b.lapangan === i + 1,
          );
          return {
            title: `Lapangan ${i + 1}`,
            data: waktu,
            bookedTimes: booking ? booking.waktu : [],
          };
        }),
      );
    } else {
      setRefreshing(true);
    }
  }, [dataLapangan]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchJadwal();
    fetchBooked();
  };

  const handleNavigateToPemesanan = (time: string, title: string) => () => {
    navigation.navigate('PemesananLapangan', {
      waktuBooking: time,
      lapangan: title,
      dataLapangan: dataLapangan,
      tanggalPemesanan: date.toISOString().split('T')[0],
    });
  };
  return (
    <>
      <FlatContainer backgroundColor="white">
        <Header title="Jadwal Lapangan" />
        <View style={styles.dateContainer}>
          <Text style={styles.dateTitle}>Tanggal</Text>
          <Pressable style={styles.btnPicker} onPress={showDatepicker}>
            <View style={styles.btnLabelContainer}>
              <Icon
                name="calendar"
                size={30}
                color="#6F7789"
                style={styles.icon}
              />
              <Text style={styles.label}>
                {date.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </Pressable>
          {show ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChange}
              maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              minimumDate={new Date(Date.now())}
            />
          ) : null}
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          {lapangan.map((lap: Lapangan, index: number) => (
            <View key={index}>
              <Text style={styles.titleContainer}>{lap.title}</Text>
              <View style={styles.itemContainer}>
                {lap.data.map((item: string, innerIndex: number) => (
                  <JadwalItem
                    key={innerIndex}
                    title={item}
                    isBooked={lap.bookedTimes.includes(item)}
                    onPress={
                      lap.bookedTimes.includes(item)
                        ? () => {}
                        : handleNavigateToPemesanan(item, lap.title)
                    }
                  />
                ))}
              </View>
            </View>
          ))}
          <BottomSpace marginBottom={40} />
        </ScrollView>
      </FlatContainer>
    </>
  );
};

export default Jadwal;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleContainer: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 20,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dateContainer: {marginHorizontal: 20, marginTop: 40},
  dateTitle: {fontFamily: 'Poppins SemiBold', fontSize: 20, marginBottom: 10},
  btnPicker: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    borderColor: '#E5E5E5',
    borderWidth: 3,
  },
  btnLabelContainer: {display: 'flex', flexDirection: 'row'},
  icon: {alignSelf: 'center'},
  label: {
    color: '#6F7789',
    fontSize: 18,
    fontFamily: 'Poppins SemiBold',
    alignSelf: 'center',
    marginLeft: 10,
  },
});
