function multiplyValue(value: number, multiplier?: number): number {
  return value * (multiplier ?? 2);
}

function processInput(value: string | number | boolean): string | number {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }

  if (typeof value === "number") {
    return value * 10;
  }

  return value ? "Active" : "Inactive";
}

function formatCoordinate(coordinate: readonly [number, number, string]): string {
  const [latitude, longitude, locationName] = coordinate;
  return `Location ${locationName} (${latitude}, ${longitude})`;
}

function concatenateArrays<T>(...arrays: T[][]): T[] {
  const combined: T[] = [];

  for (const array of arrays) {
    for (const item of array) {
      combined.push(item);
    }
  }

  return combined;
}

interface Course {
  title: string;
  students: number;
  isPublished: boolean;
}

function getPopularCourses(courses: Course[], minStudents: number): Course[] {
  return courses.filter(
    (course: Course): boolean =>
      course.isPublished && course.students >= minStudents,
  );
}

function pluckValues<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item: T): T[K] => item[key]);
}

class Employee {
  protected name: string;
  private baseSalary: number;

  constructor(name: string, baseSalary: number) {
    this.name = name;
    this.baseSalary = baseSalary;
  }

  getDetails(): string {
    return `Employee ${this.name}, Base Salary ${this.baseSalary}`;
  }
}

class Manager extends Employee {
  private department: string;

  constructor(name: string, baseSalary: number, department: string) {
    super(name, baseSalary);
    this.department = department;
  }

  getRoleInfo(): string {
    return `Manager of ${this.department} ${this.name}`;
  }
}
