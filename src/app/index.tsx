// Home.tsx
import { Course } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { deleteCourse, getCourses, insertCourse, searchCourses } from '../db/courseService';
import { initDB } from '../db/schema';


const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState('');
  const [fees, setFees] = useState('');
const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const setup = async () => {
      await initDB();
      loadCourses();
    };
    setup();
  }, []);

  const loadCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleAddCourse = async () => {
    if (name.trim() && fees) {
      await insertCourse({ name, fees: Number(fees) });
      setName('');
      setFees('');
      loadCourses();
    }
  };

  const handleDeleteCourse = async (id: number) => {
    await deleteCourse(id);
    loadCourses();
  };
const handleSearch = async (text: string) => {
  setSearchQuery(text);
  const results = await searchCourses(text);
  setCourses(results);
};

  return (
    <View style={styles.container}>
      <TextInput
      style={{borderWidth:1, borderColor: "green", borderRadius:10}}
  value={searchQuery}
  onChangeText={handleSearch}
  placeholder="Search course"
/>

      <Text style={styles.title}>Courses</Text>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id?.toString() || ''}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text>{item.name} - ${item.fees}</Text>
            <TouchableOpacity onPress={() => handleDeleteCourse(item.id!)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TextInput
        placeholder="Course Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Fees"
        value={fees}
        onChangeText={setFees}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Course" onPress={handleAddCourse} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#666',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
